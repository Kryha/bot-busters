import type { FC } from "react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import {
  useWalletModal,
  WalletConnectButton,
  WalletModalButton,
} from "@demox-labs/aleo-wallet-adapter-reactui";

// export const WalletMultiButton: FC = () => {
//   const { publicKey, wallet, disconnect, connecting } = useWallet();
//   const { setVisible } = useWalletModal();
//   const [copied, setCopied] = useState(false);
//   const [active, setActive] = useState(false);
//   const ref = useRef<HTMLUListElement>(null);

//   const base58 = useMemo(() => publicKey?.toString(), [publicKey]);
//   const content = useMemo(() => {
//     if (!wallet || !base58) return null;
//     return base58.slice(0, 5) + "...." + base58.slice(-5);
//   }, [wallet, base58]);

//   const copyAddress = useCallback(async () => {
//     if (base58) {
//       await navigator.clipboard.writeText(base58);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 400);
//     }
//   }, [base58]);

//   const openDropdown = useCallback(() => {
//     setActive(true);
//   }, []);

//   const closeDropdown = useCallback(() => {
//     setActive(false);
//   }, []);

//   const openModal = useCallback(() => {
//     setVisible(true);
//     closeDropdown();
//   }, [setVisible, closeDropdown]);

//   useEffect(() => {
//     const listener = (event: MouseEvent | TouchEvent) => {
//       const node = ref.current;

//       // Do nothing if clicking dropdown or its descendants
//       if (!node || node.contains(event.target as Node)) return;

//       closeDropdown();
//     };

//     document.addEventListener("mousedown", listener);
//     document.addEventListener("touchstart", listener);

//     return () => {
//       document.removeEventListener("mousedown", listener);
//       document.removeEventListener("touchstart", listener);
//     };
//   }, [ref, closeDropdown]);

//   if (!wallet)
//     return (
//       <WalletModalButton
//         className={"!bg-aquamarine !text-black !font-normal"}
//       />
//     );

//   if (!base58 && !connecting)
//     return (
//       <WalletConnectButton
//         className={"!bg-aquamarine !text-black !font-normal"}
//       />
//     );

//   if (connecting)
//     return (
//       <Button
//         className={"!bg-aquamarine !text-black !font-normal"}
//         {...props}
//         onClick={() => disconnect()}
//       >
//         <div className="inline-block relative mr-2">
//           <img
//             src={wallet.adapter.icon}
//             className="inline w-8 h-8 rounded-full mr-2"
//             alt={wallet.adapter.name}
//           />
//         </div>
//         <span className="font-bold">Connecting...</span>
//       </Button>
//     );

//   return (
//     <div className="wallet-adapter-dropdown">
//       <Button
//         aria-expanded={active}
//         style={{ pointerEvents: active ? "none" : "auto", ...props.style }}
//         onClick={openDropdown}
//         {...props}
//       >
//         <div className="inline-block relative mr-2">
//           <img
//             src={wallet.adapter.icon}
//             alt={`${wallet.adapter.name}`}
//             className="inline w-8 h-8 rounded-full mr-2"
//           />
//         </div>
//         <span className="font-bold">{content}</span>
//       </Button>
//       <ul
//         aria-label="dropdown-list"
//         className={`w-full wallet-adapter-dropdown-list ${
//           active && "wallet-adapter-dropdown-list-active"
//         }`}
//         ref={ref}
//         role="menu"
//       >
//         <li
//           onClick={copyAddress}
//           className="flex flex-row justify-center border-none outline-none cursor-pointer whitespace-nowrap box-border px-4 py-2 w-full rounded-md hover:text-aquamarine"
//           role="menuitem"
//         >
//           {copied ? "Copied" : "Copy address"}
//         </li>
//         <li
//           onClick={openModal}
//           className="flex flex-row justify-center border-none outline-none cursor-pointer whitespace-nowrap box-border px-4 py-2 w-full rounded-md hover:text-aquamarine"
//           role="menuitem"
//         >
//           Change wallet
//         </li>
//         <li
//           onClick={disconnect}
//           className="flex flex-row justify-center border-none outline-none cursor-pointer whitespace-nowrap box-border px-4 py-2 w-full rounded-md hover:text-aquamarine text-red-400"
//           role="menuitem"
//         >
//           Disconnect
//         </li>
//       </ul>
//     </div>
//   );
// };
