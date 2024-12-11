// import {
//   type AleoDeployment,
//   type AleoTransaction,
//   BaseMessageSignerWalletAdapter,
//   DecryptPermission,
//   scopePollingDetectionStrategy,
//   WalletAdapterNetwork,
//   WalletConnectionError,
//   WalletDecryptionError,
//   WalletDecryptionNotAllowedError,
//   WalletDisconnectionError,
//   type WalletName,
//   WalletNotConnectedError,
//   WalletNotReadyError,
//   WalletReadyState,
//   WalletRecordsError,
//   WalletSignTransactionError,
//   WalletTransactionError,
//   WalletError,
// } from "@demox-labs/aleo-wallet-adapter-base";
// import {
//   connect,
//   type CreateEventRequestData,
//   decrypt,
//   disconnect,
//   EventStatus,
//   EventType,
//   getAccount,
//   getEvent,
//   getRecords,
//   type RecordsFilter,
//   requestCreateEvent,
//   requestSignature,
//   type SessionTypes,
// } from "@puzzlehq/sdk";
// import { type LeoWallet } from "@demox-labs/aleo-wallet-adapter-leo";

// enum Network {
//   AleoTestnet = "AleoTestnet",
//   AleoMainnet = "AleoMainnet",
// }

// enum RecordStatus {
//   Unspent = "Unspent",
//   Pending = "Pending",
//   Spent = "Spent",
// }

// type Record = {
//   _id: string;
//   eventId?: string;
//   height: number;
//   timestamp: Date;
//   ciphertext: string;
//   programId: string;
//   functionId: string;
//   name: string;
//   network: Network;
//   transactionId: string;
//   transitionId: string;
//   index: number;
//   status: RecordStatus;
//   owner?: string | null;
//   spentEventId?: string;
//   serialNumber?: string | null;
// };

// type StringRecord = {
//   [key: string]: string | StringRecord;
// };

// type RecordWithPlaintext = Record & {
//   plaintext: string;
//   microcredits: number;
//   data: StringRecord;
// };

// import { PUZZLE_EXT_URL, PUZZLE_ADAPTER_ICON } from "~/constants/index.js";

// export interface PuzzleWindow extends Window {
//   puzzle?: LeoWallet;
// }

// declare const window: PuzzleWindow;

// export interface PuzzleWalletAdapterConfig {
//   appName?: string;
// }

// export const PuzzleWalletName = "Puzzle Wallet" as WalletName<"Puzzle Wallet">;

// export class PuzzleWalletAdapter extends BaseMessageSignerWalletAdapter {
//   name = PuzzleWalletName;
//   url = PUZZLE_EXT_URL;
//   icon = PUZZLE_ADAPTER_ICON;
//   readonly supportedTransactionVersions = null;

//   private _connecting: boolean;
//   private _wallet: SessionTypes.Struct | undefined | null;
//   private _publicKey: string | null;
//   private _decryptPermission: string;
//   private _readyState: WalletReadyState =
//     typeof window === "undefined" || typeof document === "undefined"
//       ? WalletReadyState.Unsupported
//       : WalletReadyState.NotDetected;

//   constructor(_config: PuzzleWalletAdapterConfig = {}) {
//     super();
//     this._connecting = false;
//     this._wallet = null;
//     this._publicKey = null;
//     this._decryptPermission = DecryptPermission.NoDecrypt;

//     if (this._readyState !== WalletReadyState.Unsupported) {
//       scopePollingDetectionStrategy(() => {
//         if (window?.puzzle) {
//           this._readyState = WalletReadyState.Installed;
//           this.emit("readyStateChange", this._readyState);
//           return true;
//         } else {
//           // Check if user is on a mobile device
//           const isMobile = /iPhone|iPad|iPod|Android/i.test(
//             navigator.userAgent,
//           );
//           if (isMobile) {
//             this._readyState = WalletReadyState.Loadable;
//             this.emit("readyStateChange", this._readyState);
//             return true;
//           }
//         }
//         return false;
//       });
//     }
//   }

//   get publicKey() {
//     return this._publicKey;
//   }

//   get decryptPermission() {
//     return this._decryptPermission;
//   }

//   get connecting() {
//     return this._connecting;
//   }

//   get readyState() {
//     return this._readyState;
//   }

//   set readyState(readyState) {
//     this._readyState = readyState;
//   }

//   async decrypt(
//     cipherText: string,
//     _tpk?: string,
//     _programId?: string,
//     _functionName?: string,
//     _index?: number,
//   ) {
//     try {
//       const wallet = this._wallet;
//       if (!wallet || !this.publicKey) throw new WalletNotConnectedError();
//       switch (this._decryptPermission) {
//         case DecryptPermission.NoDecrypt:
//           throw new WalletDecryptionNotAllowedError();

//         case DecryptPermission.UponRequest:
//         case DecryptPermission.AutoDecrypt:
//         case DecryptPermission.OnChainHistory: {
//           try {
//             const text = await decrypt([cipherText]);
//             if (
//               text.error ??
//               !text.plaintexts ??
//               text.plaintexts[0] === undefined
//             ) {
//               throw new Error(text.error ?? "Puzzle decrypt error");
//             }

//             return text.plaintexts[0];
//           } catch (error) {
//             const message =
//               error instanceof Error ? error.message : "Permission not granted";
//             throw new WalletDecryptionError(message, error);
//           }
//         }
//         default:
//           throw new WalletDecryptionError();
//       }
//     } catch (error) {
//       if (error instanceof WalletError) {
//         this.emit("error", error);
//       }
//       throw error;
//     }
//   }

//   async requestRecords(program: string) {
//     try {
//       const wallet = this._wallet;
//       if (!wallet || !this.publicKey) {
//         throw new WalletNotConnectedError();
//       }

//       const filter: RecordsFilter = {
//         programIds: [program],
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore: Ignoring because importing the enum will make the build fail
//         status: "Unspent",
//       };

//       let allRecords: unknown[] = [];
//       let page = 0;

//       while (true) {
//         console.log(`Requesting records for:`);
//         console.log(filter);
//         const result = await getRecords({
//           address: this.publicKey,
//           filter,
//           page,
//         });

//         if (result.error) {
//           if (allRecords.length > 0) {
//             break;
//           }
//           throw new Error(result.error);
//         }

//         const records = result.records ?? [];
//         allRecords = allRecords.concat(
//           records.map((record) => {
//             if (typeof record.data.data === "string") {
//               record.data.data = JSON.parse(record.data.data) as string;
//             }
//             return {
//               ...record,
//               owner: this.publicKey,
//               program_id: program,
//               recordName: record.name,
//               spent: false,
//             };
//           }),
//         );

//         // If the number of records is less than 20, it means that there are no more records
//         if (records.length !== 20) {
//           break;
//         }

//         page++;
//       }

//       return allRecords;
//     } catch (error) {
//       const message =
//         error instanceof Error ? error.message : "Permission not granted";
//       this.emit("error", new WalletRecordsError(message, error));
//       throw error;
//     }
//   }

//   async requestTransaction(transaction: AleoTransaction): Promise<string> {
//     try {
//       const wallet = this._wallet;
//       if (!wallet || !this.publicKey) throw new WalletNotConnectedError();
//       try {
//         const transition = transaction.transitions[0];
//         if (!transition) throw new Error("Transition not found in transaction");

//         transition.inputs;

//         const requestData = {
//           type: EventType.Execute,
//           programId: transition.program,
//           functionId: transition.functionName,
//           fee: transaction.fee / 1000000,
//           inputs: transition.inputs as (string | RecordWithPlaintext)[],
//         } satisfies CreateEventRequestData;
//         const result = await requestCreateEvent(requestData);
//         if (result.error) {
//           throw new Error(result.error);
//         }
//         return result.eventId ? result.eventId : "";
//       } catch (error) {
//         const message =
//           error instanceof Error ? error.message : "Permission not granted";
//         throw new WalletTransactionError(message, error);
//       }
//     } catch (error) {
//       if (error instanceof WalletError) {
//         this.emit("error", error);
//       }
//       throw error;
//     }
//   }

//   async transactionStatus(transactionId: string): Promise<string> {
//     try {
//       const wallet = this._wallet;
//       if (!wallet || !this.publicKey) throw new WalletNotConnectedError();
//       try {
//         const result = await getEvent({
//           id: transactionId,
//           address: this.publicKey,
//         });
//         if (result.error) {
//           throw new Error(result.error);
//         }
//         return result.event
//           ? result.event.status == EventStatus.Settled
//             ? "Finalized"
//             : result.event.status
//           : "";
//       } catch (error) {
//         const message =
//           error instanceof Error ? error.message : "Transaction status error";
//         throw new WalletTransactionError(message, error);
//       }
//     } catch (error) {
//       if (error instanceof WalletError) {
//         this.emit("error", error);
//       }
//       throw error;
//     }
//   }

//   async requestRecordPlaintexts(program: string) {
//     return this.requestRecords(program);
//   }

//   getChainId(network: WalletAdapterNetwork) {
//     switch (network) {
//       case WalletAdapterNetwork.MainnetBeta:
//         return "aleo:0";
//       case WalletAdapterNetwork.TestnetBeta:
//         return "aleo:1";
//       default:
//         return "aleo:1";
//     }
//   }

//   async connect(
//     decryptPermission: DecryptPermission,
//     network: WalletAdapterNetwork,
//     _programs?: string[],
//   ): Promise<void> {
//     try {
//       if (this.connected || this.connecting) return;
//       if (
//         this._readyState !== WalletReadyState.Installed &&
//         this._readyState !== WalletReadyState.Loadable
//       )
//         throw new WalletNotReadyError();

//       this._connecting = true;

//       try {
//         this._wallet = await connect();
//         const account = await getAccount(this.getChainId(network));
//         if (account.error) throw new Error(account.error);
//         if (!account.account?.address) throw new Error("Address not found");

//         this._publicKey = account.account.address;
//         this.emit("connect", this._publicKey);
//       } catch (error) {
//         const message =
//           error instanceof Error ? error.message : "Wallet connect error";
//         throw new WalletConnectionError(message, error);
//       }

//       this._decryptPermission = decryptPermission;
//     } catch (error) {
//       if (error instanceof WalletError) {
//         this.emit("error", error);
//       }
//       throw error;
//     } finally {
//       this._connecting = false;
//     }
//   }

//   async disconnect(): Promise<void> {
//     const wallet = this._wallet;
//     if (wallet) {
//       // wallet.off('disconnect', this._disconnected);

//       this._wallet = null;
//       this._publicKey = null;

//       try {
//         await disconnect();
//       } catch (error) {
//         const message =
//           error instanceof Error ? error.message : "Wallet disconnect error";
//         this.emit("error", new WalletDisconnectionError(message, error));
//       }
//     }

//     this.emit("disconnect");
//   }

//   async signMessage(message: Uint8Array): Promise<Uint8Array> {
//     try {
//       const wallet = this._wallet;
//       if (!wallet || !this.publicKey) throw new WalletNotConnectedError();

//       try {
//         // convert message to string
//         const messageString = new TextDecoder().decode(message);
//         const signature = await requestSignature({
//           message: messageString,
//           address: this.publicKey,
//         });
//         if (signature.error) throw new Error(signature.error);

//         // convert signature to Uint8Array
//         return new TextEncoder().encode(signature.signature);
//       } catch (error) {
//         const message =
//           error instanceof Error ? error.message : "Sign message error";
//         throw new WalletSignTransactionError(message, error);
//       }
//     } catch (error) {
//       if (error instanceof WalletError) {
//         this.emit("error", error);
//       }
//       throw error;
//     }
//   }

//   requestDeploy(_deployment: AleoDeployment): Promise<string> {
//     throw new Error("Method not implemented.");
//   }

//   requestExecution(_transaction: AleoTransaction): Promise<string> {
//     throw new Error("Method not implemented.");
//   }

//   requestBulkTransactions(_transactions: AleoTransaction[]): Promise<string[]> {
//     throw new Error("Method not implemented.");
//   }

//   getExecution(_transactionId: string): Promise<string> {
//     throw new Error("Method not implemented.");
//   }

//   requestTransactionHistory(_program: string): Promise<unknown[]> {
//     throw new Error("Method not implemented.");
//   }
// }
