import { folder, useControls } from "leva";

export const DancingGirlHips = () => {
  const [controls] = useControls(() => ({
    colors: folder({
      greyscale: {
        value: false,
      },
      color1: "#ce2038",
      color2: "#8a0b41",
      color3: "#585651",
      color4: "#888c78",
      color5: "#453c3c",
      color6: "#d77e4b",
      color7: "#c0b10a",
      color8: "#793d4e",
      color9: "#5b6731",
      color10: "#331a19",
      color11: "#79390a",
    }),
  }));

  return (
    <svg width="0" height="0" style={{ display: "none" }}>
      <symbol
        style={{ filter: controls.greyscale ? "grayscale(100%)" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="hips1"
      >
        <path
          stroke={controls.color1}
          d="M14 8h7M13 9h9M15 10h8M13 11h6M21 11h2M13 12h7M21 12h3M13 13h7M21 13h3M14 14h6M21 14h2M12 15h1M22 15h1M12 16h1M22 16h1M13 17h1M22 17h2M14 18h1M25 22h1M25 23h1M24 24h1M23 25h2"
        />
        <path
          stroke={controls.color2}
          d="M13 10h2M12 11h1M19 11h2M12 12h1M20 12h1M12 13h1M20 13h1M12 14h2M20 14h1M13 15h1M20 15h2M13 16h2M20 16h2M14 17h1M19 17h3M21 18h1M24 21h2M24 22h1M23 23h2M22 24h2M21 25h2"
        />
        <path
          stroke={controls.color3}
          d="M23 14h1M11 15h1M23 15h1M10 16h2M23 16h1M26 16h1M10 17h3M25 17h2M11 18h3M23 18h4M11 19h3M21 19h5M21 20h5M22 21h2M22 22h2M22 23h1M13 25h1M12 26h3M10 27h1M16 27h2M19 28h1M2 35h1M3 36h2M14 36h1M5 37h1M14 37h1M5 38h1M6 39h1M13 39h1M13 40h1M12 41h2"
        />
        <path
          stroke={controls.color4}
          d="M24 14h1M24 15h3M24 16h2M24 17h1M16 18h1M22 18h1M14 19h1M16 19h1M19 19h1M16 20h1M18 20h1M13 23h1M16 23h1M11 27h5M8 28h11M7 29h12M5 30h13M4 31h13M3 32h14M2 33h14M2 34h13M3 35h12M5 36h9M6 37h8M6 38h8M7 39h6M7 40h6M8 41h4"
        />
        <path stroke={controls.color5} d="M14 15h1M17 15h2" />
        <path
          stroke={controls.color6}
          d="M15 15h2M19 15h1M15 16h5M15 17h4M17 19h2M17 20h1M24 46h1M24 47h1M25 48h1"
        />
        <path
          stroke={controls.color7}
          d="M15 18h1M20 18h1M15 19h1M20 19h1M13 20h3M19 20h2M13 21h8M13 22h9M14 23h2M17 23h5M18 24h3M19 29h1M18 30h2M17 31h3M17 32h3M16 33h4M15 34h6M15 35h6M15 36h7M3 37h2M15 37h7M3 38h2M14 38h9M3 39h3M14 39h9M4 40h3M14 40h10M4 41h4M14 41h10M5 42h19M6 43h18M7 44h17M9 45h8"
        />
        <path
          stroke={controls.color8}
          d="M17 18h3M22 45h2M10 46h2M22 46h2M10 47h2M23 47h1M10 48h2M23 48h2M10 49h1M24 49h1M13 51h1M24 51h1M27 51h1"
        />
        <path
          stroke={controls.color9}
          d="M21 21h1M14 24h4M21 24h1M14 25h7M15 26h6M18 27h3"
        />
        <path
          stroke={controls.color10}
          d="M11 49h2M25 49h2M9 50h4M24 50h3M9 51h2M14 51h1M23 51h1M28 51h1M9 52h6M23 52h6"
        />
        <path stroke={controls.color11} d="M11 51h2M25 51h2"></path>
      </symbol>
      <symbol
        style={{ filter: controls.greyscale ? "grayscale(100%)" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="hips2"
      >
        <path
          stroke={controls.color1}
          d="M18 8h6M18 9h7M16 10h1M18 10h5M24 10h1M16 11h8M25 11h1M15 12h2M19 12h5M25 12h1M15 13h2M18 13h6M25 13h1M15 14h2M18 14h6M26 14h1M15 15h1M26 15h1M15 16h1M25 16h1M16 17h1M25 17h1M27 22h1M26 23h1M26 24h1"
        ></path>
        <path
          stroke={controls.color2}
          d="M24 8h1M17 9h1M17 10h1M23 10h1M25 10h1M24 11h1M17 12h2M24 12h1M17 13h1M24 13h1M17 14h1M24 14h2M16 15h2M24 15h2M16 16h2M24 16h1M26 16h1M17 17h1M24 17h1M27 20h1M27 21h1M26 22h1"
        ></path>
        <path
          stroke={controls.color3}
          d="M13 14h2M13 15h2M13 16h1M23 17h1M17 18h1M19 18h1M23 18h1M25 18h1M17 19h1M25 19h1M17 20h1M22 20h1M25 20h1M21 21h1M21 23h1M18 27h2M18 28h5M17 29h6M16 30h7M15 31h9M13 32h11M12 33h12M9 34h14M9 35h14M9 36h14M9 37h13M10 38h12M13 39h9M13 40h7M13 41h7M14 42h5M16 43h2"
        ></path>
        <path
          stroke={controls.color4}
          d="M27 14h2M27 15h2M14 16h1M27 16h2M13 17h3M26 17h3M13 18h4M26 18h3M14 19h3M26 19h2M15 20h2M26 20h1M16 21h1M26 21h1M18 26h1M17 27h1M20 27h5M16 28h2M23 28h2M15 29h2M23 29h2M15 30h1M23 30h1M14 31h1M11 39h2M12 40h1"
        ></path>
        <path stroke={controls.color5} d="M18 15h2M22 15h2"></path>
        <path
          stroke={controls.color6}
          d="M20 15h2M18 16h6M19 17h4M20 19h3M20 20h2"
        ></path>
        <path
          stroke={controls.color7}
          d="M18 17h1M20 18h3M13 46h3M24 46h3M12 47h3M25 47h2M12 48h2M25 48h2M13 49h1M13 51h1M27 51h1"
        ></path>
        <path
          stroke={controls.color8}
          d="M18 18h1M24 18h1M18 19h2M23 19h2M18 20h2M23 20h2M17 21h4M22 21h4M17 22h9M17 23h4M22 23h4M17 24h4M22 24h3M25 26h1M25 27h1M25 28h2M25 29h2M24 30h3M24 31h3M24 32h4M24 33h4M23 34h5M23 35h5M23 36h5M22 37h6M22 38h5M22 39h5M11 40h1M20 40h7M11 41h2M20 41h7M10 42h4M19 42h8M10 43h6M18 43h9M12 44h15M13 45h14M17 46h7"
        ></path>
        <path
          stroke={controls.color9}
          d="M21 24h1M25 24h1M18 25h8M19 26h6"
        ></path>
        <path
          stroke={controls.color10}
          d="M11 49h2M25 49h2M11 50h3M24 50h4M10 51h1M24 51h1M10 52h4M24 52h4"
        ></path>
        <path stroke={controls.color11} d="M11 51h2M25 51h2"></path>
      </symbol>
      <symbol
        style={{ filter: controls.greyscale ? "grayscale(100%)" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="hips3"
      >
        <path
          stroke={controls.color1}
          d="M19 8h6M17 9h9M17 10h3M22 10h5M16 11h3M22 11h3M16 12h3M20 12h7M15 13h3M20 13h7M15 14h3M21 14h6M15 15h3M23 15h3M15 16h3M16 17h2M16 23h1M16 24h2M17 25h1"
        ></path>
        <path
          stroke={controls.color2}
          d="M20 10h2M19 11h3M25 11h2M19 12h1M18 13h2M18 14h1M18 15h1M18 16h2M25 16h1M18 17h2M25 17h1M19 18h2M23 18h3M16 22h1M17 23h1"
        ></path>
        <path
          stroke={controls.color3}
          d="M14 13h1M14 14h1M27 14h1M26 15h3M26 16h3M12 17h2M15 17h1M26 17h3M13 18h4M26 18h2M13 19h5M25 19h3M15 20h3M26 20h1M15 21h3M17 22h1M22 27h3M19 28h2M19 29h1"
        ></path>
        <path
          stroke={controls.color4}
          d="M13 14h1M13 15h2M12 16h3M14 17h1M17 18h2M18 19h1M20 19h1M23 19h1M18 20h1M20 20h1M23 20h1M22 21h1M18 24h1M22 24h1M25 27h1M21 28h6M20 29h7M19 30h9M19 31h9M19 32h10M19 33h11M18 34h13M18 35h13M18 36h13M17 37h15M17 38h15M17 39h15M17 40h14M17 41h14M17 42h13"
        ></path>
        <path
          stroke={controls.color5}
          d="M19 14h2M19 15h1M22 15h1M20 16h5M20 17h5M21 19h2M21 20h2M14 44h1M14 45h1M13 46h2M13 47h1"
        ></path>
        <path stroke={controls.color6} d="M20 15h2"></path>
        <path
          stroke={controls.color7}
          d="M21 18h2M15 44h2M15 45h2M15 46h1M26 46h2M14 47h1M26 47h2M13 48h2M26 48h2M14 49h1M27 49h1M10 51h1M12 51h1"
        ></path>
        <path
          stroke={controls.color8}
          d="M19 19h1M24 19h1M19 20h1M24 20h2M18 21h4M23 21h4M18 22h9M18 23h8M19 24h3M23 24h3M26 26h1M26 27h1M27 28h1M27 29h2M18 30h1M28 30h1M18 31h1M28 31h1M18 32h1M17 33h2M17 34h1M17 35h1M16 36h2M14 37h3M13 38h4M11 39h6M11 40h6M11 41h6M13 42h4M15 43h15M17 44h13M19 45h10"
        ></path>
        <path stroke={controls.color9} d="M18 25h9M19 26h7M19 27h3"></path>
        <path
          stroke={controls.color10}
          d="M12 49h2M25 49h2M11 50h4M25 50h3M13 51h2M24 51h1M27 51h2M10 52h5M24 52h5"
        ></path>
        <path stroke={controls.color11} d="M11 51h1M25 51h2"></path>
      </symbol>
      <symbol
        style={{ filter: controls.greyscale ? "grayscale(100%)" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="hips4"
      >
        <path
          stroke={controls.color1}
          d="M20 8h6M18 9h8M17 10h10M17 11h3M22 11h6M16 12h3M21 12h7M16 13h3M21 13h7M16 14h4M22 14h5M16 15h3M23 15h3M16 16h2M17 17h1M14 21h1M14 22h1M15 24h1"
        ></path>
        <path
          stroke="#8a0b41"
          d="M20 11h2M19 12h2M19 13h2M19 15h1M18 16h2M18 17h2M15 21h1M15 22h2M15 23h3M16 24h3M16 25h3"
        ></path>
        <path
          stroke="#585651"
          d="M15 14h1M26 15h2M15 16h1M25 16h3M12 17h2M15 17h2M25 17h3M12 18h2M15 18h3M25 18h2M13 19h5M26 19h1M14 20h4M16 21h3M17 22h2M18 23h1M29 39h4M29 40h2"
        ></path>
        <path
          stroke="#d77e4b"
          d="M20 14h2M20 15h1M20 16h5M21 17h4M19 18h1M21 19h3M22 20h2M14 46h1M14 47h1"
        ></path>
        <path
          stroke="#888c78"
          d="M14 15h2M13 16h2M14 17h1M14 18h1M23 18h1M18 19h1M20 19h1M24 19h1M18 20h1M21 20h1M24 20h1M19 23h1M24 23h1M19 24h1M24 24h1M24 27h2M22 28h5M20 29h8M20 30h9M20 31h11M20 32h14M20 33h16M20 34h16M20 35h16M20 36h15M21 37h14M21 38h13M22 39h7M23 40h6M24 41h4M25 42h2"
        ></path>
        <path stroke="#453c3c" d="M21 15h2"></path>
        <path
          stroke="#793d4e"
          d="M20 17h1M20 18h3M15 45h2M15 46h2M27 46h2M15 47h1M27 47h2M13 48h3M27 48h2M14 49h1M28 49h1M13 51h1M27 51h1"
        ></path>
        <path
          stroke="#c0b10a"
          d="M18 18h1M24 18h1M19 19h1M25 19h1M19 20h2M25 20h2M19 21h8M19 22h8M20 23h4M25 23h2M20 24h4M25 24h2M26 26h1M26 27h2M27 28h2M19 29h1M28 29h1M19 30h1M29 30h1M18 31h2M18 32h2M18 33h2M18 34h2M17 35h3M17 36h3M17 37h4M16 38h5M15 39h7M33 39h1M15 40h8M31 40h3M15 41h9M28 41h5M15 42h10M27 42h6M15 43h17M15 44h16M17 45h12"
        ></path>
        <path stroke="#5b6731" d="M19 25h7M19 26h7M19 27h5M19 28h3"></path>
        <path
          stroke="#331a19"
          d="M12 49h2M25 49h3M11 50h4M25 50h4M10 51h1M14 51h1M24 51h1M28 51h1M10 52h4M24 52h5"
        ></path>
        <path stroke="#79390a" d="M11 51h2M25 51h2"></path>
      </symbol>
      <symbol
        style={{ filter: controls.greyscale ? "grayscale(100%)" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="hips5"
      >
        <path
          stroke={controls.color1}
          d="M18 8h7M17 9h9M16 10h10M16 11h2M20 11h6M16 12h2M19 12h6M15 13h3M19 13h7M16 14h2M21 14h6M16 15h1M22 15h3M26 15h1M16 16h1M26 16h1M25 17h1M24 18h1M13 21h1M12 22h2M12 23h2M13 24h1M13 25h3M15 26h2"
        ></path>
        <path
          stroke={controls.color2}
          d="M18 11h2M26 11h1M18 12h1M25 12h2M18 13h1M26 13h1M18 14h1M17 15h2M25 15h1M17 16h2M24 16h2M16 17h4M24 17h1M17 18h1M14 21h1M14 22h2M14 23h2M14 24h3M16 25h2"
        ></path>
        <path
          stroke={controls.color3}
          d="M14 14h1M12 15h3M13 16h2M14 17h1M16 18h1M22 18h1M19 19h1M22 19h1M24 19h1M20 20h1M22 20h1M22 23h1M25 23h1M25 26h3M23 27h7M23 28h9M23 29h11M24 30h11M25 31h11M26 32h11M26 33h11M26 34h11M26 35h11M26 36h11M26 37h10M27 38h6M34 38h1M27 39h4M27 40h3"
        ></path>
        <path
          stroke="#585651"
          d="M15 14h1M15 15h1M27 15h1M12 16h1M15 16h1M27 16h2M12 17h2M15 17h1M26 17h3M12 18h4M25 18h3M13 19h5M25 19h3M13 20h5M15 21h2M16 22h1M16 23h1M24 25h2M21 26h4M19 27h4M22 28h1M23 30h1M24 31h1M25 32h1M25 33h1M26 38h1M33 38h1M26 39h1M31 39h1M26 40h1"
        ></path>
        <path
          stroke="#d77e4b"
          d="M19 14h2M19 15h1M19 16h5M20 17h4M20 19h2M21 20h1M15 45h1M14 46h2M28 46h1M14 47h1M28 47h1"
        ></path>
        <path stroke="#453c3c" d="M20 15h2"></path>
        <path
          stroke="#c0b10a"
          d="M18 18h1M23 18h1M18 19h1M23 19h1M18 20h2M23 20h3M18 21h8M17 22h9M17 23h5M23 23h2M18 24h3M19 28h3M19 29h4M19 30h4M19 31h5M19 32h6M18 33h7M17 34h9M17 35h9M17 36h9M16 37h10M16 38h10M16 39h10M32 39h3M15 40h11M30 40h5M15 41h19M15 42h18M15 43h17M17 44h13M19 45h9"
        ></path>
        <path
          stroke="#793d4e"
          d="M19 18h3M15 44h2M16 45h1M28 45h1M16 46h1M27 46h1M15 47h1M27 47h1M13 48h2M27 48h2M14 49h1M28 49h1M11 51h1M14 51h1M25 51h1"
        ></path>
        <path
          stroke="#5b6731"
          d="M17 21h1M17 24h1M21 24h4M18 25h6M18 26h3M18 27h1"
        ></path>
        <path
          stroke="#331a19"
          d="M12 49h2M25 49h3M12 50h3M25 50h4M10 51h1M24 51h1M28 51h2M10 52h5M24 52h6"
        ></path>
        <path stroke="#79390a" d="M12 51h2M26 51h2"></path>
      </symbol>
      <symbol
        style={{ filter: controls.greyscale ? "grayscale(100%)" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="hips6"
      >
        <path
          stroke={controls.color1}
          d="M16 8h6M14 9h8M14 10h9M13 11h10M13 12h2M16 12h5M22 12h2M13 13h1M15 13h7M23 13h1M12 14h1M15 14h7M23 14h1M12 15h1M23 15h1M13 16h1M23 16h1M13 17h1M22 17h1M12 21h1M12 22h1M12 23h1"
        ></path>
        <path
          stroke={controls.color2}
          d="M13 10h1M15 12h1M21 12h1M14 13h1M22 13h1M13 14h2M22 14h1M13 15h2M21 15h2M12 16h1M14 16h1M21 16h2M14 17h1M21 17h1"
        ></path>
        <path
          stroke="#585651"
          d="M10 14h2M10 15h2M10 16h2M24 16h1M10 17h3M23 17h3M10 18h3M22 18h4M11 19h2M22 19h3M12 20h1M22 20h2M22 21h1M20 26h1M14 27h7M14 28h1M24 31h1M23 32h3M14 34h1M28 36h2M15 37h1M27 37h2M28 38h1M16 40h1"
        ></path>
        <path
          stroke={controls.color3}
          d="M24 14h2M24 15h2M25 16h1M15 17h1M13 18h1M15 18h1M19 18h1M21 18h1M13 19h1M21 19h1M13 20h1M16 20h1M21 20h1M17 21h1M17 23h1M15 28h7M14 29h9M14 30h10M14 31h10M14 32h9M14 33h14M15 34h16M15 35h16M15 36h13M16 37h11M16 38h12M16 39h12M17 40h11M17 41h10M18 42h8M21 43h2"
        ></path>
        <path stroke="#453c3c" d="M15 15h2M19 15h2"></path>
        <path
          stroke="#d77e4b"
          d="M17 15h2M15 16h6M16 17h4M16 19h3M17 20h2"
        ></path>
        <path
          stroke="#793d4e"
          d="M20 17h1M16 18h3M12 46h3M24 46h2M12 47h3M24 47h3M12 48h2M25 48h2M25 49h1M11 51h1M25 51h1"
        ></path>
        <path
          stroke="#c0b10a"
          d="M14 18h1M20 18h1M14 19h2M19 19h2M14 20h2M19 20h2M13 21h4M18 21h4M13 22h9M13 23h4M18 23h4M14 24h3M18 24h4M13 26h1M13 27h1M21 27h1M12 28h2M12 29h2M12 30h2M12 31h2M11 32h3M11 33h3M11 34h3M11 35h4M11 36h4M11 37h4M12 38h4M29 38h1M12 39h4M28 39h2M12 40h4M28 40h2M12 41h5M27 41h3M12 42h6M26 42h3M12 43h9M23 43h5M12 44h15M12 45h14"
        ></path>
        <path stroke="#5b6731" d="M13 24h1M17 24h1M13 25h8M14 26h6"></path>
        <path
          stroke="#331a19"
          d="M12 49h2M26 49h2M11 50h4M25 50h3M14 51h1M28 51h1M11 52h4M25 52h4"
        ></path>
        <path stroke="#79390a" d="M12 51h2M26 51h2"></path>
      </symbol>
      <symbol
        style={{ filter: controls.greyscale ? "grayscale(100%)" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="hips7"
      >
        <path
          stroke={controls.color1}
          d="M12 8h6M11 9h9M10 10h6M17 10h3M11 11h5M18 11h3M10 12h7M18 12h3M10 13h7M19 13h3M10 14h6M19 14h3M11 15h3M19 15h3M19 16h3M19 17h2"
        ></path>
        <path
          stroke={controls.color2}
          d="M16 10h1M10 11h1M16 11h2M17 12h1M17 13h2M18 14h1M10 15h1M18 15h1M11 16h1M17 16h2M11 17h1M17 17h2M12 18h2M16 18h2M20 22h1M19 23h2M19 24h1"
        ></path>
        <path
          stroke="#585651"
          d="M22 13h1M9 14h1M22 14h1M8 15h2M8 16h3M8 17h3M21 17h1M23 17h2M9 18h2M20 18h4M9 19h3M19 19h5M10 20h1M19 20h3M19 21h3M19 22h1M11 26h1M11 27h1M15 28h3M10 29h1M10 30h1M16 40h1M16 41h2M16 42h2M16 43h1"
        ></path>
        <path
          stroke="#d77e4b"
          d="M16 14h2M14 15h1M17 15h1M12 16h5M12 17h5M14 19h2M14 20h2M24 45h1M24 46h2M25 47h1"
        ></path>
        <path
          stroke={controls.color3}
          d="M23 14h1M22 15h2M22 16h3M22 17h1M18 18h2M13 19h1M16 19h1M18 19h1M13 20h1M16 20h1M18 20h1M14 21h1M14 24h1M18 24h1M12 27h1M11 28h4M11 29h7M11 30h7M10 31h8M10 32h9M9 33h10M9 34h11M9 35h12M9 36h12M9 37h13M9 38h13M9 39h14M9 40h7M17 40h6M9 41h7M18 41h3M9 42h7M9 43h7"
        ></path>
        <path stroke="#453c3c" d="M15 15h2"></path>
        <path
          stroke="#793d4e"
          d="M14 18h2M23 45h1M23 46h1M11 47h2M24 47h1M11 48h2M24 48h2M11 49h1M24 49h1M25 51h1"
        ></path>
        <path
          stroke="#c0b10a"
          d="M12 19h1M17 19h1M11 20h2M17 20h1M10 21h4M15 21h4M10 22h9M11 23h8M11 24h3M15 24h3M10 26h1M10 27h1M18 27h1M18 28h2M18 29h2M18 30h3M18 31h3M19 32h2M19 33h3M20 34h2M21 35h1M21 36h2M22 37h2M22 38h3M23 39h3M23 40h4M21 41h6M18 42h9M17 43h10M10 44h16M10 45h13M11 46h8"
        ></path>
        <path stroke="#5b6731" d="M10 25h9M12 26h6M13 27h5"></path>
        <path
          stroke="#331a19"
          d="M12 49h2M25 49h2M11 50h3M24 50h4M10 51h2M14 51h1M24 51h1M28 51h1M10 52h5M24 52h5"
        ></path>
        <path stroke="#79390a" d="M12 51h2M26 51h2"></path>
      </symbol>
      <symbol
        style={{ filter: controls.greyscale ? "grayscale(100%)" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="hips8"
      >
        <path
          stroke={controls.color1}
          d="M13 8h6M12 9h9M12 10h4M19 10h3M11 11h6M18 11h4M11 12h6M19 12h4M11 13h5M19 13h4M11 14h5M19 14h4M11 15h4M20 15h3M21 16h2M21 17h1M23 21h2M24 22h1M23 23h2M23 24h1M20 25h3"
        ></path>
        <path
          stroke={controls.color2}
          d="M16 10h3M17 11h1M17 12h2M16 13h3M19 15h1M19 16h2M19 17h2M22 22h2M21 23h2M20 24h3"
        ></path>
        <path
          stroke="#d77e4b"
          d="M16 14h3M18 15h1M14 16h5M14 17h4M19 18h1M15 19h3M15 20h2"
        ></path>
        <path
          stroke="#585651"
          d="M23 14h1M11 16h3M23 16h1M11 17h3M22 17h2M25 17h2M12 18h2M21 18h3M25 18h2M12 19h1M21 19h5M21 20h4M20 21h3M20 22h2M20 23h1M13 26h3M12 27h8M16 28h4M18 33h1M17 37h1M17 38h1M6 39h3M17 39h1M7 40h1M16 40h1M14 41h1M11 42h2"
        ></path>
        <path
          stroke="#793d4e"
          d="M15 15h1M18 17h1M16 18h3M23 43h1M22 44h2M21 45h3M10 46h2M22 46h3M10 47h2M23 47h2M10 48h2M24 48h2M10 49h1M24 49h1M11 51h1M25 51h1M28 51h1"
        ></path>
        <path stroke="#453c3c" d="M16 15h2"></path>
        <path
          stroke={controls.color3}
          d="M23 15h2M24 16h2M24 17h1M15 18h1M24 18h1M14 19h1M18 19h1M20 19h1M14 20h1M17 20h1M20 20h1M14 23h1M19 23h1M14 24h1M19 24h1M11 28h5M10 29h9M9 30h10M8 31h11M7 32h12M6 33h12M5 34h13M4 35h14M4 36h14M4 37h13M5 38h12M9 39h8M8 40h8M9 41h5M13 42h1"
        ></path>
        <path
          stroke="#c0b10a"
          d="M14 18h1M20 18h1M13 19h1M19 19h1M12 20h2M18 20h2M12 21h8M12 22h8M12 23h2M15 23h4M12 24h2M15 24h4M12 26h1M11 27h1M10 28h1M19 29h1M19 30h1M19 31h2M19 32h2M19 33h2M18 34h3M18 35h4M18 36h4M18 37h4M18 38h5M18 39h5M6 40h1M17 40h7M6 41h3M15 41h9M6 42h5M14 42h10M7 43h16M8 44h14M10 45h10"
        ></path>
        <path stroke="#5b6731" d="M13 25h7M16 26h4"></path>
        <path
          stroke="#331a19"
          d="M11 49h2M25 49h2M10 50h4M24 50h4M10 51h1M14 51h1M24 51h1M10 52h5M24 52h5"
        ></path>
        <path stroke="#79390a" d="M12 51h2M26 51h2"></path>
      </symbol>
    </svg>
  );
};
export const DancingGirlBalancing = () => {
  return (
    <div>
      <svg width="0" height="0" style={{ display: "none" }}>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="balancing1"
        >
          <path
            stroke="#ce2038"
            d="M14 9h3M12 10h6M11 11h3M15 11h5M11 12h3M16 12h4M12 13h2M17 13h3M19 14h2M19 15h2M19 16h3M10 17h1M17 17h5M10 18h1M16 18h6M11 19h1M16 19h2M21 19h1M21 20h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M14 11h1M14 12h2M16 13h1M17 14h2M12 15h1M17 15h2M11 16h1M17 16h2M11 17h1M16 17h1M11 18h2M12 19h2"
          ></path>
          <path
            stroke="#d77e4b"
            d="M14 13h2M13 14h4M13 15h1M16 15h1M16 16h1M14 20h1M14 21h1M14 22h1M8 28h2M7 29h2M4 30h3M8 30h1M26 30h2M8 31h1M25 31h2M23 46h1M23 47h1"
          ></path>
          <path
            stroke="#453c3c"
            d="M14 15h2M15 16h1M11 24h2M11 26h1M11 27h2M10 28h1M13 28h1M17 50h1M24 50h1M18 51h1M22 51h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M12 16h3M12 17h4M13 18h3M23 28h1M23 29h2M26 29h2M24 30h2M24 31h1M24 32h1"
          ></path>
          <path
            stroke="#793d4e"
            d="M14 19h2M15 20h1M9 29h1M7 30h1M5 31h3M17 48h2"
          ></path>
          <path
            stroke="#c0b10a"
            d="M18 19h1M13 20h1M17 20h2M13 21h1M17 21h1M16 22h2M15 23h2M13 24h4M12 25h5M13 26h4M19 28h1M19 29h3M19 30h3M19 31h3M19 32h4M18 33h5M18 34h5M18 35h5M18 36h6M17 37h7M17 38h7M17 39h7M17 40h7M17 41h7M13 42h1M17 42h8M12 43h13M12 44h13M12 45h12M11 46h12M11 47h10"
          ></path>
          <path
            stroke="#888c78"
            d="M19 19h2M16 20h1M19 20h2M15 21h2M18 21h3M13 22h1M15 22h1M19 22h3M13 23h2M20 23h2M22 25h1M21 26h3M18 27h2M22 27h1M17 28h2M22 28h1M24 28h1M16 29h3M22 29h1M15 30h4M14 31h5M14 32h5M13 33h5M13 34h5M10 35h8M10 36h8M9 37h8M8 38h1M11 38h6M12 39h5M13 40h4M14 41h3M15 42h2"
          ></path>
          <path
            stroke="#585651"
            d="M12 20h1M12 21h1M11 22h2M18 22h1M11 23h2M18 23h2M18 24h1M20 24h3M10 25h2M21 25h1M10 26h1M9 27h2M14 29h2M13 30h2M13 31h1M13 32h1M12 33h1M11 34h2M9 38h2M8 39h4M11 40h2M13 41h1M14 42h1"
          ></path>
          <path
            stroke="#5b6731"
            d="M17 23h1M17 24h1M17 25h2M12 26h1M17 26h2M13 27h5M14 28h3M13 29h1M10 40h1M10 41h3M9 42h4M9 43h3M9 44h3M9 45h3M10 46h1"
          ></path>
          <path stroke="#dadfc3" d="M23 27h2"></path>
          <path
            stroke="#331a19"
            d="M24 46h2M24 47h3M19 48h1M23 48h4M17 49h3M23 49h3M16 50h1M18 50h2M22 50h1M25 50h1M15 51h1M19 51h1M24 51h1M15 52h5M22 52h2"
          ></path>
          <path stroke="#79390a" d="M23 50h1M16 51h2M23 51h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="balancing2"
        >
          <path
            stroke="#ce2038"
            d="M14 8h4M13 9h6M12 10h3M16 10h4M12 11h3M17 11h4M12 12h3M18 12h3M20 13h2M20 14h2M20 15h2M11 16h1M18 16h4M11 17h1M17 17h5M11 18h2M17 18h2M21 18h1M12 19h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M15 10h1M15 11h2M17 12h1M18 13h2M13 14h1M18 14h2M12 15h1M18 15h2M12 16h1M17 16h1M12 17h2M13 18h2"
          ></path>
          <path
            stroke="#d77e4b"
            d="M15 12h2M14 13h4M14 14h1M17 14h1M17 15h1M15 19h1M15 20h1M15 21h1M10 29h2M7 30h5M10 31h1M25 31h2M10 32h1M23 46h2M23 47h2M23 48h2"
          ></path>
          <path
            stroke="#453c3c"
            d="M15 14h2M16 15h1M12 24h1M12 25h2M13 26h1M13 27h2M13 28h2M12 29h1M14 29h1M17 50h1M24 50h1M18 51h1M22 51h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M13 15h3M13 16h4M14 17h3M23 28h2M23 29h3M24 30h4M24 31h1"
          ></path>
          <path stroke="#793d4e" d="M15 18h2M16 19h1M8 31h2M17 48h2"></path>
          <path
            stroke="#c0b10a"
            d="M19 18h2M14 19h1M18 19h2M14 20h1M18 20h1M13 21h1M17 21h2M13 22h1M16 22h2M13 23h5M13 24h5M14 25h4M20 28h1M20 29h2M20 30h2M20 31h2M19 32h4M19 33h4M19 34h4M19 35h4M18 36h6M18 37h6M17 38h7M16 39h8M16 40h8M16 41h8M16 42h9M15 43h10M15 44h10M15 45h9M15 46h8M16 47h5"
          ></path>
          <path
            stroke="#585651"
            d="M13 19h1M13 20h1M12 21h1M12 22h1M19 22h1M12 23h1M19 23h2M21 24h2M21 25h1M23 25h1M12 26h1M21 26h1M12 27h1M11 28h2M14 30h1M14 31h1M14 32h1M13 33h1M13 34h1M12 35h2M11 36h2M16 37h2M16 38h1M15 39h1M15 40h1"
          ></path>
          <path
            stroke="#888c78"
            d="M17 19h1M20 19h2M16 20h2M19 20h3M14 21h1M16 21h1M19 21h3M14 22h2M20 22h3M21 23h3M23 24h1M22 25h1M22 26h2M17 27h3M22 27h1M15 28h5M22 28h1M15 29h5M15 30h5M15 31h5M15 32h4M14 33h5M14 34h5M14 35h5M13 36h5M11 37h5M10 38h6M9 39h6M9 40h6M10 41h5"
          ></path>
          <path
            stroke="#5b6731"
            d="M18 22h1M18 23h1M18 24h2M18 25h2M14 26h5M15 27h2M15 41h1M11 42h5M11 43h4M11 44h4M11 45h4M12 46h3M13 47h3"
          ></path>
          <path stroke="#dadfc3" d="M23 27h2"></path>
          <path
            stroke="#331a19"
            d="M25 47h2M19 48h1M25 48h2M17 49h3M23 49h4M16 50h1M18 50h2M22 50h1M25 50h1M15 51h1M19 51h1M24 51h2M15 52h5M22 52h3"
          ></path>
          <path stroke="#79390a" d="M23 50h1M16 51h2M23 51h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="balancing3"
        >
          <path
            stroke="#ce2038"
            d="M15 7h6M14 8h8M14 9h10M14 10h4M20 10h4M15 11h2M21 11h3M23 12h2M23 13h2M23 14h2M14 15h1M21 15h4M13 16h2M20 16h4M13 17h3M20 17h2M14 18h2M14 19h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M18 10h2M20 11h1M21 12h2M16 13h1M21 13h2M15 14h1M21 14h2M15 15h1M20 15h1M15 16h2M16 17h2"
          ></path>
          <path
            stroke="#d77e4b"
            d="M17 11h3M17 12h4M17 13h1M20 13h1M20 14h1M18 18h1M18 19h1M18 20h1M15 27h1M15 28h1M13 29h3M13 30h1M12 31h1M27 31h2M24 48h2M24 49h2M25 50h2"
          ></path>
          <path
            stroke="#453c3c"
            d="M18 13h2M19 14h1M16 20h1M16 21h1M16 22h1M16 24h1M16 25h1M16 26h2M16 27h1M17 50h1M24 50h1M18 51h1M22 51h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M16 14h3M16 15h4M17 16h3M26 28h1M25 29h2M25 30h4M26 31h1M29 31h1M26 32h1"
          ></path>
          <path
            stroke="#793d4e"
            d="M18 17h2M19 18h1M14 30h2M13 31h2M17 48h2M17 49h2"
          ></path>
          <path
            stroke="#c0b10a"
            d="M22 17h2M17 18h1M21 18h2M17 19h1M21 19h1M20 20h2M19 21h2M17 22h4M17 23h4M17 24h4M23 27h1M23 28h1M23 29h2M23 30h2M23 31h3M23 32h3M22 33h4M22 34h5M22 35h5M22 36h5M22 37h5M22 38h6M22 39h6M22 40h6M22 41h6M22 42h6M19 43h9M19 44h9M19 45h9M19 46h9M18 47h9M20 48h3"
          ></path>
          <path
            stroke="#585651"
            d="M16 18h1M15 19h2M15 20h1M15 21h1M22 21h1M15 22h1M22 22h2M16 23h1M23 23h1M23 24h2M15 26h1M19 27h2M16 28h4M16 29h1M15 34h1M15 41h1M16 42h2"
          ></path>
          <path
            stroke="#888c78"
            d="M20 18h1M23 18h2M19 19h2M22 19h3M17 20h1M19 20h1M22 20h3M17 21h2M23 21h3M24 22h2M24 23h2M25 24h1M23 25h3M23 26h3M21 27h2M24 27h1M20 28h3M17 29h6M16 30h7M16 31h7M16 32h7M16 33h6M16 34h6M15 35h7M15 36h7M15 37h7M14 38h8M14 39h8M14 40h8M16 41h6M18 42h4"
          ></path>
          <path
            stroke="#5b6731"
            d="M21 21h1M21 22h1M21 23h2M21 24h2M17 25h5M18 26h4M17 27h2M15 42h1M15 43h4M14 44h5M14 45h5M14 46h5M15 47h3"
          ></path>
          <path stroke="#dadfc3" d="M25 27h2M24 28h2"></path>
          <path
            stroke="#331a19"
            d="M16 50h1M18 50h1M22 50h1M27 50h1M15 51h1M19 51h1M24 51h4M15 52h5M22 52h6"
          ></path>
          <path stroke="#79390a" d="M23 50h1M16 51h2M23 51h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="balancing4"
        >
          <path
            stroke="#ce2038"
            d="M18 7h3M17 8h6M16 9h8M16 10h3M21 10h5M17 11h2M22 11h4M23 12h3M24 13h3M24 14h3M16 15h1M24 15h3M15 16h2M21 16h6M15 17h2M21 17h6M16 18h2M22 18h2M26 18h1M17 19h2"
          ></path>
          <path
            stroke="#8a0b41"
            d="M19 10h2M19 11h3M18 12h1M22 12h1M18 13h1M22 13h2M17 14h2M23 14h1M17 15h1M23 15h1M17 16h1M17 17h2M18 18h2"
          ></path>
          <path
            stroke="#d77e4b"
            d="M19 12h3M19 13h3M19 14h1M22 14h1M22 15h1M20 19h1M20 20h1M20 21h1M17 31h1M15 32h3M25 34h3M24 49h2M25 50h2"
          ></path>
          <path
            stroke="#453c3c"
            d="M20 14h2M21 15h1M17 22h1M17 23h1M17 24h1M17 26h2M17 27h1M17 28h1M17 29h1M17 50h1M24 50h1M16 51h1M18 51h1M22 51h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M18 15h3M18 16h3M19 17h2M26 30h1M25 31h2M25 32h2M25 33h4M24 34h1"
          ></path>
          <path
            stroke="#793d4e"
            d="M20 18h2M21 19h1M15 33h2M17 48h2M17 49h2"
          ></path>
          <path
            stroke="#c0b10a"
            d="M24 18h2M19 19h1M23 19h2M19 20h1M23 20h1M18 21h1M22 21h2M18 22h1M21 22h2M18 23h5M18 24h5M19 25h4M26 35h2M26 36h2M26 37h2M26 38h3M26 39h3M26 40h3M26 41h3M26 42h3M26 43h3M22 44h7M22 45h7M22 46h7M22 47h7M22 48h6"
          ></path>
          <path
            stroke="#888c78"
            d="M22 19h1M25 19h2M21 20h2M24 20h3M19 21h1M21 21h1M25 21h2M19 22h2M25 22h3M25 23h3M27 24h1M26 25h2M25 26h3M23 27h5M23 28h4M21 29h4M19 30h6M27 30h1M19 31h6M18 32h7M18 33h7M18 34h6M18 35h8M18 36h8M18 37h8M18 38h8M18 39h8M18 40h8M17 41h9M18 42h2M22 42h4M24 43h2"
          ></path>
          <path
            stroke="#585651"
            d="M18 20h1M17 21h1M24 21h1M24 22h1M24 23h1M25 24h2M17 25h1M25 25h1M16 26h1M16 27h1M16 28h1M18 28h5M16 29h1M18 29h3M17 30h2M18 31h1M17 42h1M20 42h2M17 43h7"
          ></path>
          <path
            stroke="#5b6731"
            d="M23 22h1M23 23h1M23 24h2M18 25h1M23 25h2M19 26h5M18 27h5M17 33h1M17 34h1M17 35h1M17 36h1M17 37h1M17 38h1M17 39h1M17 40h1M16 44h6M16 45h6M16 46h6M16 47h6M19 48h3"
          ></path>
          <path stroke="#dadfc3" d="M25 29h3M25 30h1"></path>
          <path
            stroke="#331a19"
            d="M16 48h1M15 49h2M15 50h2M18 50h1M22 50h1M27 50h1M15 51h1M19 51h1M24 51h4M16 52h4M22 52h6"
          ></path>
          <path stroke="#79390a" d="M23 50h1M17 51h1M23 51h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="balancing5"
        >
          <path
            stroke="#ce2038"
            d="M20 8h2M19 9h5M18 10h7M18 11h2M22 11h5M18 12h1M23 12h4M24 13h3M18 14h1M26 14h2M17 15h1M25 15h3M16 16h2M23 16h6M16 17h2M22 17h7M16 18h2M22 18h6M17 19h2M23 19h2M26 19h2M27 20h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M20 11h2M19 12h4M23 13h1M19 14h1M24 14h2M18 15h2M24 15h1M18 16h1M18 17h1M18 18h2M19 19h2M18 20h2"
          ></path>
          <path
            stroke="#d77e4b"
            d="M20 13h3M20 14h4M20 15h1M23 15h1M21 20h1M21 21h1M21 22h1M25 35h1M24 49h2M25 50h2"
          ></path>
          <path
            stroke="#453c3c"
            d="M21 15h2M22 16h1M19 27h1M19 28h1M19 29h1M17 50h1M24 50h1M18 51h1M22 51h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M19 16h3M19 17h3M20 18h2M26 31h1M26 32h2M25 33h3M25 34h2M24 35h1M26 35h1M26 36h2"
          ></path>
          <path
            stroke="#793d4e"
            d="M21 19h2M22 20h1M17 47h2M17 48h2M17 49h2"
          ></path>
          <path
            stroke="#c0b10a"
            d="M25 19h1M20 20h1M24 20h2M20 21h1M24 21h1M19 22h1M23 22h2M19 23h1M22 23h2M19 24h5M19 25h5M28 34h1M28 35h1M29 37h1M29 38h1M30 39h1M30 40h2M30 41h3M30 42h3M24 43h3M29 43h4M24 44h9M24 45h8M25 46h6M25 47h5M25 48h2"
          ></path>
          <path
            stroke="#888c78"
            d="M23 20h1M26 20h1M22 21h2M25 21h3M20 22h1M22 22h1M25 22h3M20 23h2M26 23h3M26 24h3M28 25h1M27 26h2M26 27h2M20 28h5M26 28h2M20 29h8M20 30h6M20 31h6M20 32h6M20 33h5M20 34h5M27 34h1M20 35h4M27 35h1M20 36h6M28 36h1M20 37h9M20 38h9M20 39h10M20 40h3M24 40h6M20 41h3M24 41h6M20 42h2M27 42h3"
          ></path>
          <path
            stroke="#585651"
            d="M19 21h1M18 22h1M18 23h1M25 23h1M18 24h1M25 24h1M18 25h1M25 25h3M26 26h1M28 27h1M28 28h1M19 34h1M19 35h1M19 36h1M19 37h1M19 38h1M19 39h1M19 40h1M23 40h1M19 41h1M23 41h1M22 42h5M21 43h2M27 43h2"
          ></path>
          <path
            stroke="#5b6731"
            d="M24 23h1M24 24h1M24 25h1M19 26h7M20 27h5M25 28h1M19 30h1M19 31h1M19 32h1M19 33h1M18 39h1M18 40h1M18 41h1M18 42h2M18 43h3M23 43h1M17 44h7M17 45h7M17 46h8M19 47h6M20 48h5"
          ></path>
          <path stroke="#dadfc3" d="M26 30h2M27 31h1"></path>
          <path
            stroke="#331a19"
            d="M15 47h2M15 48h2M15 49h2M16 50h1M18 50h1M22 50h1M27 50h1M16 51h1M19 51h1M24 51h4M17 52h3M22 52h6"
          ></path>
          <path stroke="#79390a" d="M23 50h1M17 51h1M23 51h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="balancing6"
        >
          <path
            stroke="#ce2038"
            d="M19 9h5M18 10h8M17 11h9M17 12h4M23 12h3M18 13h2M25 13h2M25 14h2M25 15h3M17 16h1M23 16h5M17 17h1M22 17h6M22 18h2M26 18h2M17 19h1M27 19h1M17 20h1"
          ></path>
          <path
            stroke="#d77e4b"
            d="M21 12h1M20 13h3M19 14h1M22 14h1M18 15h1M22 15h1M20 19h1M20 20h1M20 21h1M28 34h2M24 49h2M25 50h2"
          ></path>
          <path
            stroke="#8a0b41"
            d="M22 12h1M23 13h2M18 14h1M23 14h2M23 15h2M22 16h1M18 17h1M17 18h3M18 19h1"
          ></path>
          <path
            stroke="#453c3c"
            d="M20 14h2M21 15h1M18 20h1M17 21h1M17 22h1M17 23h1M17 24h1M17 25h1M18 26h1M17 50h1M24 50h1M16 51h1M18 51h1M22 51h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M19 15h2M18 16h4M19 17h3M26 29h1M26 30h2M26 31h2M27 32h2M27 33h3M26 34h2M30 34h1"
          ></path>
          <path stroke="#793d4e" d="M20 18h2M21 19h1M17 48h2M17 49h2"></path>
          <path
            stroke="#c0b10a"
            d="M24 18h2M19 19h1M23 19h2M19 20h1M23 20h1M18 21h1M22 21h2M18 22h1M21 22h2M18 23h5M18 24h5M19 25h4M27 42h2M25 43h4M22 44h7M22 45h7M22 46h7M22 47h7M22 48h5"
          ></path>
          <path
            stroke="#888c78"
            d="M22 19h1M25 19h2M21 20h2M24 20h3M19 21h1M21 21h1M24 21h3M19 22h2M25 22h3M26 23h1M25 24h2M26 26h1M25 27h3M22 28h2M20 29h4M19 30h7M19 31h7M19 32h8M19 33h8M19 34h7M19 35h10M19 36h10M20 37h10M20 38h11M20 39h4M25 39h6M20 40h4M25 40h6M20 41h4M26 41h3M21 42h3"
          ></path>
          <path
            stroke="#5b6731"
            d="M23 22h1M23 23h1M23 24h2M18 25h1M23 25h2M19 26h5M18 27h5M18 34h1M18 35h1M18 36h1M18 37h2M18 38h2M17 39h3M17 40h3M17 41h3M17 42h4M17 43h4M17 44h5M17 45h5M17 46h5M17 47h5M19 48h3"
          ></path>
          <path
            stroke="#585651"
            d="M24 22h1M24 23h2M27 23h1M27 24h1M25 25h2M25 26h1M23 27h2M18 28h4M24 28h1M18 29h2M24 29h1M18 30h1M18 31h1M18 32h1M18 33h1M24 39h1M24 40h1M24 41h2M24 42h3M21 43h4"
          ></path>
          <path stroke="#dadfc3" d="M25 28h3M25 29h1M27 29h1"></path>
          <path
            stroke="#331a19"
            d="M16 48h1M15 49h2M15 50h2M18 50h1M22 50h1M27 50h1M15 51h1M19 51h1M24 51h4M16 52h4M22 52h6"
          ></path>
          <path stroke="#79390a" d="M23 50h1M17 51h1M23 51h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="balancing7"
        >
          <path
            stroke="#ce2038"
            d="M17 8h5M16 9h8M15 10h3M20 10h4M15 11h3M21 11h3M16 12h1M23 12h2M23 13h2M23 14h3M21 15h6M16 16h1M20 16h8M16 17h1M20 17h2M24 17h4M25 18h3M25 19h2"
          ></path>
          <path
            stroke="#8a0b41"
            d="M18 10h2M20 11h1M21 12h2M16 13h1M21 13h2M21 14h2M20 15h1M17 17h1M24 18h1"
          ></path>
          <path
            stroke="#d77e4b"
            d="M18 11h2M17 12h4M17 13h1M20 13h1M20 14h1M18 18h1M18 19h1M18 20h1M14 30h2M12 31h3M27 31h2M14 32h1M28 32h2M24 48h2M24 49h2M25 50h2"
          ></path>
          <path
            stroke="#453c3c"
            d="M18 13h2M19 14h1M16 21h1M16 22h1M15 23h2M16 24h1M16 25h1M16 26h2M16 27h1M15 29h1M17 50h1M24 50h1M18 51h1M22 51h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M16 14h3M16 15h4M17 16h3M27 29h1M26 30h3M26 31h1M29 31h2"
          ></path>
          <path
            stroke="#793d4e"
            d="M18 17h2M19 18h1M15 31h1M17 48h1M17 49h2"
          ></path>
          <path
            stroke="#c0b10a"
            d="M22 17h2M17 18h1M21 18h2M17 19h1M21 19h1M20 20h2M19 21h2M17 22h4M17 23h4M17 24h4M23 27h1M23 28h1M23 29h2M23 30h2M24 31h1M24 32h2M24 33h2M24 34h2M25 35h1M26 36h1M26 37h1M27 39h1M27 40h1M27 41h1M26 42h3M19 43h1M24 43h5M19 44h10M18 45h12M18 46h12M18 47h10M18 48h6"
          ></path>
          <path
            stroke="#585651"
            d="M16 18h1M15 19h2M15 20h2M15 21h1M22 21h2M15 22h1M22 22h1M24 23h2M23 24h2M23 25h2M15 27h1M18 27h1M24 27h1M15 28h1M17 28h1M16 29h1M25 29h1M16 30h1M16 31h1M16 32h1M16 33h1M16 34h1M16 35h1M16 36h1M16 37h1M16 38h1M16 39h1M16 40h1M19 40h1M16 41h1M19 41h1M16 42h1M18 42h3M20 43h2"
          ></path>
          <path
            stroke="#888c78"
            d="M20 18h1M23 18h1M19 19h2M22 19h3M17 20h1M19 20h1M22 20h3M17 21h2M24 21h2M23 22h3M23 23h1M25 24h1M25 25h1M24 26h3M19 27h4M25 27h2M18 28h5M25 28h1M17 29h6M17 30h6M17 31h7M17 32h7M17 33h7M17 34h7M17 35h8M17 36h9M17 37h9M17 38h10M17 39h10M17 40h2M20 40h7M17 41h2M20 41h7M17 42h1M21 42h5M22 43h2"
          ></path>
          <path
            stroke="#5b6731"
            d="M21 21h1M21 22h1M21 23h2M21 24h2M17 25h5M18 26h4M17 27h1M16 28h1M16 43h3M16 44h3M16 45h2M16 46h2M16 47h2"
          ></path>
          <path stroke="#dadfc3" d="M26 28h2M26 29h1"></path>
          <path
            stroke="#331a19"
            d="M16 50h1M18 50h1M22 50h1M27 50h1M15 51h1M19 51h1M24 51h4M15 52h5M22 52h6"
          ></path>
          <path stroke="#79390a" d="M23 50h1M16 51h2M23 51h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="balancing8"
        >
          <path
            stroke="#ce2038"
            d="M15 8h3M13 9h6M12 10h9M12 11h3M17 11h6M13 12h2M18 12h6M20 13h4M13 14h1M20 14h4M20 15h5M18 16h8M13 17h1M17 17h9M13 18h1M17 18h2M21 18h5M23 19h3M23 20h2M23 21h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M15 11h2M17 12h1M18 13h2M18 14h2M18 15h2M17 16h1M14 18h1M22 19h1M22 20h1"
          ></path>
          <path
            stroke="#d77e4b"
            d="M15 12h2M14 13h4M14 14h1M17 14h1M17 15h1M15 19h1M15 20h1M15 21h1M10 29h1M7 30h4M10 31h1M25 31h2M23 46h2M23 47h2M23 48h2"
          ></path>
          <path
            stroke="#453c3c"
            d="M15 14h2M16 15h1M12 23h1M13 25h1M12 26h2M12 27h1M12 28h1M11 29h2M17 50h1M24 50h1M18 51h1M22 51h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M13 15h3M13 16h4M14 17h3M24 28h1M23 29h3M24 30h4M24 31h1"
          ></path>
          <path stroke="#793d4e" d="M15 18h2M16 19h1M7 31h3M17 48h2"></path>
          <path
            stroke="#c0b10a"
            d="M19 18h2M14 19h1M18 19h2M14 20h1M18 20h1M13 21h1M17 21h2M13 22h1M16 22h2M13 23h5M13 24h5M14 25h4M18 26h1M20 28h1M19 29h3M20 30h2M20 31h2M20 32h3M20 33h3M21 34h2M21 35h3M21 36h3M21 37h4M21 38h4M21 39h4M21 40h4M20 41h5M17 42h8M15 43h10M15 44h10M15 45h9M15 46h8M16 47h5"
          ></path>
          <path
            stroke="#585651"
            d="M13 19h1M13 20h1M12 21h1M12 22h1M19 22h2M19 23h1M12 24h1M21 24h2M11 25h2M21 25h2M11 26h1M21 26h1M11 27h1M15 27h1M18 27h2M10 28h2M14 28h2M19 28h1M14 29h1M22 29h1M11 30h1M14 30h1M20 39h1M11 40h1M14 40h1M20 40h1M12 41h1M14 41h2M19 41h1M13 42h4"
          ></path>
          <path
            stroke="#888c78"
            d="M17 19h1M20 19h2M16 20h2M19 20h3M14 21h1M16 21h1M19 21h3M14 22h2M21 22h1M20 23h2M20 24h1M22 26h2M16 27h2M22 27h1M16 28h3M22 28h1M15 29h4M15 30h5M14 31h6M13 32h7M13 33h7M13 34h8M12 35h9M12 36h9M12 37h9M11 38h10M11 39h9M12 40h2M15 40h5M13 41h1M16 41h3"
          ></path>
          <path
            stroke="#5b6731"
            d="M18 22h1M18 23h1M18 24h2M18 25h2M14 26h4M14 27h1M11 41h1M11 42h2M11 43h4M11 44h4M11 45h4M12 46h3M13 47h3"
          ></path>
          <path stroke="#dadfc3" d="M23 27h2M23 28h1"></path>
          <path
            stroke="#331a19"
            d="M25 47h2M19 48h1M25 48h2M17 49h3M23 49h4M16 50h1M18 50h2M22 50h1M25 50h1M15 51h1M19 51h1M24 51h2M15 52h5M22 52h3"
          ></path>
          <path stroke="#79390a" d="M23 50h1M16 51h2M23 51h1"></path>
        </symbol>
      </svg>
    </div>
  );
};
export const DancingGirlSkips = () => {
  return (
    <div>
      <svg width="0" height="0" style={{ display: "none" }}>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="skip1"
        >
          <path
            stroke="#ce2038"
            d="M18 3h4M16 4h7M15 5h3M19 5h4M15 6h3M21 6h3M15 7h3M21 7h4M15 8h2M21 8h1M23 8h2M23 9h2M23 10h3M15 11h1M23 11h4M15 12h1M23 12h5M15 13h1M20 13h4M26 13h2M20 14h1M26 14h2M26 15h2M26 16h2M24 17h3M25 18h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M18 5h1M18 6h3M20 7h1M22 8h1M22 9h1M22 10h1M21 11h2M20 12h3M16 13h1M24 13h2M17 14h2M25 14h1M25 15h1M25 16h1"
          ></path>
          <path
            stroke="#d77e4b"
            d="M18 7h2M17 8h4M16 9h1M20 9h2M18 10h1M21 10h1M20 11h1M20 15h1M19 16h2M16 17h1M9 19h1M9 20h1M12 20h2M27 22h2M28 23h2M27 24h1M27 25h1M17 44h1M17 45h1M17 46h2M17 47h2M16 48h2M16 49h2"
          ></path>
          <path
            stroke="#ffb164"
            d="M17 9h1M16 10h2M16 11h4M16 12h4M17 13h3M9 17h1M8 18h3M10 19h1M12 19h2M10 20h2"
          ></path>
          <path
            stroke="#453c3c"
            d="M18 9h2M19 10h2M13 46h1M14 47h1M14 48h1M14 49h1M14 50h1"
          ></path>
          <path
            stroke="#c0b10a"
            d="M19 14h1M22 14h3M18 15h2M21 15h2M17 16h2M21 16h1M17 17h1M20 19h1M17 20h3M16 21h3M22 24h1M22 25h2M21 26h4M20 27h6M19 28h7M19 29h7M18 30h8M18 31h6M18 32h6M18 33h5M18 34h4M18 35h3M17 36h6M17 37h8M27 37h3M17 38h13M17 39h12M17 40h12M17 41h11M18 42h10M18 43h9M18 44h8M18 45h6M19 46h3"
          ></path>
          <path stroke="#793d4e" d="M21 14h1M28 24h2M28 25h1"></path>
          <path
            stroke="#888c78"
            d="M23 15h1M22 16h3M19 17h5M15 18h2M19 18h2M15 19h5M14 20h1M22 23h1M20 24h2M18 25h4M14 26h6M8 27h11M6 28h12M10 29h8M11 30h7M12 31h5M12 32h4M12 33h4M12 34h3M13 35h2M13 36h1"
          ></path>
          <path
            stroke="#585651"
            d="M24 15h1M18 17h1M17 18h2M21 18h4M23 19h4M15 20h2M23 20h5M23 21h1M26 21h2M16 24h4M15 25h3M12 26h2M7 29h3M10 30h1M11 31h1M11 32h1"
          ></path>
          <path stroke="#dadfc3" d="M13 18h2M14 19h1"></path>
          <path
            stroke="#5b6731"
            d="M21 19h2M20 20h3M19 21h4M16 22h7M17 23h5M20 26h1M19 27h1M18 28h1M18 29h1M9 30h1M9 31h2M17 31h1M24 31h2M9 32h2M16 32h2M24 32h1M9 33h3M16 33h2M23 33h2M10 34h2M15 34h3M22 34h3M10 35h3M15 35h3M21 35h5M11 36h2M14 36h3M23 36h4M11 37h6M25 37h2M12 38h5M13 39h4M14 40h3M15 41h2M16 42h2M17 43h1"
          ></path>
          <path
            stroke="#331a19"
            d="M12 47h1M12 48h1M13 49h1M15 49h1M13 50h1M15 50h3M14 51h4M15 52h2"
          ></path>
          <path stroke="#79390a" d="M13 47h1M13 48h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="skip2"
        >
          <path
            stroke="#ce2038"
            d="M13 8h5M12 9h7M12 10h3M16 10h5M13 11h1M17 11h5M13 12h1M18 12h4M13 13h2M18 13h1M21 13h1M23 13h3M12 14h2M21 14h7M11 15h2M21 15h4M26 15h2M11 16h1M21 16h3M26 16h2M11 17h1M19 17h4M27 17h1M18 18h4M27 18h1M18 19h1M26 19h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M15 10h1M14 11h3M14 12h1M16 12h2M19 13h2M19 14h2M20 15h1M25 15h1M12 16h1M19 16h2M24 16h2M12 17h1M23 17h4M11 18h3M22 18h5M13 19h3M19 19h6M18 20h7M22 21h2"
          ></path>
          <path
            stroke="#d77e4b"
            d="M15 12h1M15 13h3M16 14h3M18 15h2M18 16h1M18 17h1M15 20h2M16 21h1M16 22h1M15 23h1M7 25h2M8 26h3M10 27h3M12 28h1M24 28h1M24 29h1M24 30h4M25 31h1M23 46h2M20 47h5M23 48h3M24 49h2M24 50h2M25 51h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M14 14h2M13 15h3M13 16h4M13 17h5M14 18h4M8 22h1M8 23h1M8 24h2M9 25h2M11 26h1"
          ></path>
          <path
            stroke="#453c3c"
            d="M16 15h2M17 16h1M7 48h1M7 49h1M22 52h1M24 52h1"
          ></path>
          <path
            stroke="#793d4e"
            d="M16 19h2M17 20h1M26 31h1M10 45h1M9 46h2M9 47h3M9 48h2M9 49h2M10 50h1"
          ></path>
          <path
            stroke="#c0b10a"
            d="M15 21h1M17 21h3M14 22h2M17 22h1M14 23h1M16 23h2M14 24h3M14 25h2M14 26h1M21 27h1M21 28h1M21 29h2M22 30h2M24 31h1M23 32h3M21 33h5M20 34h5M18 35h7M17 36h7M16 37h8M16 38h8M28 38h2M16 39h7M26 39h3M15 40h8M25 40h3M15 41h7M24 41h4M14 42h13M14 43h12M15 44h11M15 45h10M17 46h6"
          ></path>
          <path
            stroke="#888c78"
            d="M20 21h2M18 22h4M18 23h3M20 24h1M16 25h4M16 26h2M14 27h1M16 27h1M14 28h1M16 28h1M13 29h2M15 30h1M7 31h8M5 32h3M14 32h3M18 32h5M15 33h6M17 34h3M17 35h1"
          ></path>
          <path
            stroke="#585651"
            d="M21 23h1M17 24h3M15 26h1M18 26h1M22 26h1M15 27h1M17 27h1M22 27h2M15 28h1M22 28h2M15 29h1M23 29h1M8 32h6M17 32h1M7 33h8M10 34h7M13 35h4"
          ></path>
          <path
            stroke="#5b6731"
            d="M21 24h1M20 25h2M19 26h3M18 27h3M17 28h4M16 29h5M16 30h6M16 31h8M25 34h1M12 35h1M25 35h1M12 36h5M24 36h2M11 37h5M24 37h3M11 38h5M24 38h4M11 39h5M23 39h3M8 40h7M23 40h2M8 41h7M22 41h2M8 42h6M8 43h6M10 44h5M11 45h4M11 46h3"
          ></path>
          <path stroke="#dadfc3" d="M13 27h1M13 28h1"></path>
          <path
            stroke="#331a19"
            d="M6 47h2M5 48h2M8 48h1M5 49h2M8 49h1M6 50h4M26 50h1M7 51h4M21 51h4M26 51h2M9 52h2M21 52h1M25 52h3"
          ></path>
          <path stroke="#79390a" d="M23 52h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="skip3"
        >
          <path
            stroke="#ce2038"
            d="M12 9h6M11 10h9M11 11h3M16 11h5M11 12h2M17 12h5M11 13h2M19 13h3M12 14h1M20 14h2M12 15h1M21 15h1M11 16h2M21 16h1M11 17h2M21 17h1M11 18h1M18 18h6M21 19h3M23 20h2M23 21h2M24 22h1M24 23h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M14 11h2M13 12h4M13 13h1M18 13h1M11 14h1M18 14h2M11 15h1M19 15h2M19 16h2M19 17h2M12 18h2M12 19h4M18 19h3M13 20h2M18 20h1M23 22h1M23 23h1"
          ></path>
          <path
            stroke="#d77e4b"
            d="M14 13h4M13 14h5M13 15h2M17 15h2M17 16h2M17 17h2M17 18h1M16 20h1M17 21h2M12 30h1M12 31h1M12 32h2M9 33h1M12 33h1M10 34h3M24 35h2M23 46h1M22 47h2M23 48h1"
          ></path>
          <path
            stroke="#453c3c"
            d="M15 15h2M16 16h1M14 21h1M14 22h1M14 23h1M14 24h1M14 25h2M14 26h2M14 27h1M13 30h2M13 31h1M24 50h1M18 51h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M13 16h3M13 17h4M14 18h3M25 30h1M25 31h1M25 32h2M25 33h2M23 34h4M26 35h2"
          ></path>
          <path
            stroke="#793d4e"
            d="M16 19h2M17 20h1M10 33h1M11 35h3M20 48h2M20 49h1"
          ></path>
          <path
            stroke="#c0b10a"
            d="M15 20h1M19 20h1M15 21h2M19 21h1M15 22h5M15 23h6M15 24h6M16 25h5M16 26h4M22 28h1M21 29h2M21 30h2M20 31h4M19 32h6M18 33h7M18 34h5M17 35h7M17 36h9M16 37h8M15 38h8M15 39h6M15 40h6M22 40h6M16 41h13M16 42h10M28 42h2M17 43h9M29 43h1M19 44h5M28 44h1M20 45h4M21 46h2M21 47h1"
          ></path>
          <path
            stroke="#888c78"
            d="M20 20h3M21 21h2M21 22h2M21 23h1M21 24h1M23 26h2M23 27h2M23 28h2M23 29h2M18 30h3M17 31h3M15 32h4M14 33h4M13 34h5M14 35h3M12 36h5M12 37h4M12 38h3M13 39h2"
          ></path>
          <path
            stroke="#585651"
            d="M20 21h1M20 22h1M22 23h1M22 24h2M22 25h2M13 26h1M22 26h1M13 27h1M22 27h1M13 28h2M13 29h2M23 30h1"
          ></path>
          <path
            stroke="#5b6731"
            d="M21 25h1M20 26h2M16 27h6M17 28h5M17 29h4M24 37h1M23 38h2M21 39h5M21 40h1M26 42h2M26 43h3M18 44h1M24 44h4M18 45h2M24 45h3M18 46h3M18 47h3M18 48h2"
          ></path>
          <path stroke="#dadfc3" d="M25 29h1M24 30h1M24 31h1"></path>
          <path
            stroke="#331a19"
            d="M24 46h2M24 47h2M22 48h1M24 48h2M21 49h3M25 49h1M19 50h5M25 50h1M17 51h1M19 51h3M24 51h2M17 52h4"
          ></path>
          <path stroke="#79390a" d="M24 49h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="skip4"
        >
          <path
            stroke="#ce2038"
            d="M15 2h4M14 3h5M13 4h7M12 5h2M16 5h5M12 6h1M16 6h4M12 7h1M17 7h3M21 8h1M21 9h1M19 10h3M19 11h2M11 12h1M18 12h3M11 13h1M17 13h5M10 14h1M20 14h4M10 15h1M22 15h3M10 16h1M24 16h1M24 17h1M24 18h1M24 19h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M14 5h2M13 6h1M15 6h1M20 6h1M16 7h1M20 7h1M18 8h3M18 9h3M18 10h1M12 12h1M12 13h2M11 14h3M11 15h3M11 16h2M23 16h1M12 17h1M23 17h1M20 19h2M20 20h2M20 21h1"
          ></path>
          <path
            stroke="#d77e4b"
            d="M14 6h1M13 7h3M14 8h1M17 8h1M17 9h1M17 10h1M17 11h2M16 12h2M14 14h2M15 15h2M15 16h2M15 17h1M27 22h1M4 23h3M9 23h1M27 23h3M31 23h1M5 24h5M7 25h2M21 39h1M20 40h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M12 8h2M12 9h4M12 10h5M12 11h5M13 12h3M32 21h1M28 22h5M30 23h1M30 24h1"
          ></path>
          <path
            stroke="#453c3c"
            d="M15 8h2M16 9h1M13 19h1M12 20h1M12 21h1M12 22h1M10 23h2M18 42h1M20 42h1M19 43h1M23 50h1"
          ></path>
          <path
            stroke="#793d4e"
            d="M14 13h3M16 14h2M5 25h2M24 45h1M23 46h1M23 47h1M23 48h1"
          ></path>
          <path
            stroke="#c0b10a"
            d="M18 14h2M14 15h1M17 15h3M14 16h1M17 16h3M14 17h1M16 17h3M14 18h5M14 19h5M13 20h6M13 21h6M13 22h3M20 24h2M18 25h5M17 26h7M14 27h10M13 28h11M11 29h13M10 30h13M10 31h12M9 32h11M9 33h7M9 34h5M17 34h4M10 35h11M10 36h12M11 37h12M13 38h10M16 39h5M17 40h3"
          ></path>
          <path
            stroke="#888c78"
            d="M20 15h2M20 16h3M21 17h1M23 18h1M23 19h1M24 20h2M24 21h2M25 22h1M18 24h2M15 25h3M14 26h3"
          ></path>
          <path
            stroke="#585651"
            d="M13 16h1M13 17h1M19 17h2M22 17h1M12 18h2M19 18h4M12 19h1M22 19h1M11 20h1M22 20h2M11 21h1M23 21h1M10 22h2M24 22h1"
          ></path>
          <path
            stroke="#5b6731"
            d="M19 19h1M19 20h1M19 21h1M16 22h4M14 23h6M14 24h4M14 25h1M23 30h1M22 31h2M20 32h3M16 33h7M14 34h3M21 34h3M9 35h1M21 35h3M9 36h1M22 36h3M9 37h2M23 37h2M11 38h2M23 38h2M23 39h3M16 40h1M23 40h3M17 41h2M23 41h4M17 42h1M22 42h5M16 43h2M21 43h6M15 44h3M21 44h5M15 45h9M15 46h8M16 47h7"
          ></path>
          <path stroke="#dadfc3" d="M26 21h2M26 22h1"></path>
          <path
            stroke="#331a19"
            d="M22 39h1M21 40h2M19 41h4M21 42h1M18 43h1M20 43h1M18 44h3M24 46h2M24 47h2M24 48h2M22 49h4M22 50h1M24 50h2M23 51h2"
          ></path>
          <path stroke="#79390a" d="M19 42h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="skip5"
        >
          <path
            stroke="#ce2038"
            d="M15 4h5M15 5h7M15 6h1M19 6h3M19 7h4M14 8h1M21 8h3M22 9h2M15 10h1M23 10h1M14 11h1M13 12h2M24 12h3M12 13h2M21 13h2M26 13h2M12 14h1M21 14h1M27 14h1M21 15h1M27 15h1M27 16h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M16 6h3M14 7h3M15 8h2M15 9h1M22 10h1M22 11h2M22 12h2M14 13h2M23 13h3M13 14h4M22 14h5M13 15h4M24 15h3M14 16h1M25 16h2M25 17h2M24 20h2M23 21h1"
          ></path>
          <path
            stroke="#d77e4b"
            d="M17 7h2M17 8h4M16 9h6M20 10h2M20 11h2M20 12h2M20 13h1M18 15h2M5 16h1M18 16h2M4 17h2M5 18h2M35 18h2M4 19h4M36 19h1M6 20h2M12 37h4M13 38h3M14 39h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M16 10h2M15 11h4M15 12h5M16 13h4M36 16h1M35 17h2M34 18h1M32 19h4M31 20h2"
          ></path>
          <path
            stroke="#453c3c"
            d="M18 10h2M19 11h1M15 18h1M12 19h1M10 20h5M8 21h5M14 42h1M9 49h1"
          ></path>
          <path
            stroke="#793d4e"
            d="M17 14h4M20 15h1M4 18h1M17 41h1M17 42h1M16 43h2M15 44h2M13 45h4M13 46h3M12 47h4M12 48h4M12 49h3M13 50h1"
          ></path>
          <path
            stroke="#c0b10a"
            d="M17 15h1M22 15h1M16 16h2M20 16h2M16 17h5M16 18h6M15 19h7M15 20h6M15 21h1M18 21h3M21 24h1M21 25h2M10 26h5M21 26h2M10 27h8M20 27h3M10 28h14M10 29h14M10 30h4M15 30h9M10 31h4M16 31h8M11 32h4M16 32h7M11 33h4M18 33h5M11 34h5M19 34h4M10 35h7M10 36h1M12 36h7M10 37h1M19 37h2M21 39h1M21 41h1M21 42h1M20 43h1M20 44h1"
          ></path>
          <path
            stroke="#888c78"
            d="M23 15h1M22 16h3M24 17h1M25 18h4M24 19h2M29 19h1M28 20h2M12 24h5M9 25h3M16 25h5M8 26h2M18 26h3M7 27h3M18 27h2M6 28h2M6 29h1M6 30h1M6 31h1"
          ></path>
          <path
            stroke="#585651"
            d="M15 16h1M15 17h1M21 17h3M14 18h1M22 18h3M13 19h2M23 19h1M26 19h3M8 20h2M27 20h1M12 25h4M15 26h3M8 28h2M7 29h3M7 30h3M7 31h3M7 32h4"
          ></path>
          <path
            stroke="#5b6731"
            d="M22 19h1M21 20h3M16 21h2M21 21h2M15 22h8M16 23h6M17 24h4M14 30h1M14 31h2M15 32h1M23 32h1M15 33h3M23 33h1M16 34h3M23 34h1M17 35h6M11 36h1M19 36h3M11 37h1M16 37h3M21 37h2M12 38h1M18 38h6M12 39h2M18 39h3M22 39h2M12 40h2M18 40h6M11 41h3M18 41h3M22 41h2M10 42h3M18 42h3M22 42h2M10 43h2M18 43h2M21 43h2M10 44h2M17 44h3M21 44h1M10 45h3M17 45h2"
          ></path>
          <path stroke="#dadfc3" d="M30 19h2M30 20h1"></path>
          <path
            stroke="#331a19"
            d="M16 38h2M15 39h3M14 40h4M14 41h3M15 42h2M12 43h4M12 44h3M8 48h3M8 49h1M10 49h1M8 50h5M9 51h5M10 52h4"
          ></path>
          <path stroke="#79390a" d="M13 42h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="skip6"
        >
          <path
            stroke="#ce2038"
            d="M15 7h3M13 8h6M12 9h8M12 10h1M18 10h3M18 11h3M20 12h5M12 13h1M20 13h4M12 14h1M20 14h1M24 14h3M11 15h1M22 15h6M10 16h1M21 16h2M10 17h1M21 17h1M10 18h1M11 19h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M13 10h5M13 11h5M13 12h2M17 12h3M13 13h1M19 13h1M13 14h1M19 14h1M21 14h3M12 15h2M19 15h3M11 16h3M19 16h2M23 16h5M11 17h4M19 17h2M22 17h4M27 17h1M11 18h6M19 18h6M12 19h5M22 19h3M13 20h1M23 20h1"
          ></path>
          <path
            stroke="#d77e4b"
            d="M15 12h2M14 13h5M14 14h2M18 14h1M18 15h1M18 16h1M18 17h1M17 19h1M16 20h2M4 21h1M16 21h2M4 22h1M16 22h1M3 23h3M4 24h2M5 25h1M33 25h1M32 26h2M13 48h2M13 49h2M12 50h3M12 51h2"
          ></path>
          <path
            stroke="#453c3c"
            d="M16 14h2M17 15h1M13 22h1M13 23h1M10 24h4M6 25h2M9 25h3M8 26h2M9 48h1M8 49h1M10 49h1M9 50h1M22 52h2"
          ></path>
          <path
            stroke="#ffb164"
            d="M14 15h3M14 16h4M15 17h3M33 24h1M32 25h1M28 26h4M29 27h4"
          ></path>
          <path
            stroke="#793d4e"
            d="M17 18h2M18 19h1M22 47h2M22 48h3M23 49h1M23 50h1"
          ></path>
          <path
            stroke="#c0b10a"
            d="M19 19h1M15 20h1M18 20h2M14 21h2M18 21h1M14 22h2M17 22h3M14 23h6M14 24h6M14 25h6M15 26h5M16 27h3M22 29h1M23 30h1M23 31h2M22 32h3M21 33h5M20 34h6M19 35h6M18 36h7M17 37h8M16 38h8M15 39h9M14 40h10M12 41h11M10 42h11M24 42h1M9 43h12M24 43h2M13 44h5M19 44h1M23 44h3M14 45h3M19 45h1M23 45h2M15 46h2M22 46h1M16 47h1"
          ></path>
          <path
            stroke="#888c78"
            d="M20 19h2M20 20h3M21 21h2M22 22h2M21 23h2M25 23h1M25 24h3M29 25h1M21 30h2M10 31h13M9 32h1M14 32h8M8 33h1M16 33h5M7 34h1M16 34h4M7 35h1M17 35h2M7 36h1"
          ></path>
          <path
            stroke="#585651"
            d="M14 20h1M13 21h1M19 21h2M20 22h2M12 23h1M23 23h2M6 24h3M22 24h3M8 25h1M24 25h3M10 32h4M9 33h7M8 34h8M8 35h9M8 36h7M10 37h4M11 38h2"
          ></path>
          <path
            stroke="#5b6731"
            d="M20 23h1M20 24h2M20 25h2M14 26h1M20 26h2M14 27h2M19 27h3M14 28h8M15 29h7M15 30h6M25 35h1M16 36h2M25 36h1M15 37h2M25 37h1M15 38h1M24 38h1M14 39h1M24 39h1M24 40h1M23 41h2M21 42h3M21 43h3M9 44h4M18 44h1M20 44h3M10 45h4M17 45h2M20 45h3M11 46h4M17 46h5M12 47h4M17 47h1M19 47h3M15 48h3M20 48h2M16 49h2"
          ></path>
          <path stroke="#dadfc3" d="M28 24h1M27 25h2M27 26h1"></path>
          <path
            stroke="#331a19"
            d="M10 48h1M25 48h1M24 49h2M8 50h1M10 50h2M24 50h2M9 51h3M22 51h4M10 52h4M21 52h1M24 52h1"
          ></path>
          <path stroke="#79390a" d="M9 49h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="skip7"
        >
          <path
            stroke="#ce2038"
            d="M12 8h2M11 9h5M10 10h2M14 10h6M10 11h2M14 11h7M19 12h2M16 13h1M20 13h1M17 14h1M19 14h3M17 15h1M19 15h3M11 16h1M17 16h2M20 16h3M11 17h1M20 17h2M12 18h1M12 19h1M23 19h1M13 20h1M23 20h2M13 21h1M24 21h3M13 22h1M25 22h2M12 23h1M25 23h2M25 24h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M12 10h2M12 11h2M11 12h2M15 12h4M11 13h1M17 13h3M11 14h1M18 14h1M11 15h1M18 15h1M19 16h1M18 17h2M22 17h1M13 18h1M21 18h2M13 19h3M21 19h2M14 20h2M21 20h2M14 21h1M21 21h3M14 22h1M23 22h2M13 23h2M23 23h2M12 24h3M23 24h2"
          ></path>
          <path
            stroke="#d77e4b"
            d="M13 12h2M12 13h4M12 14h5M12 15h2M16 15h1M16 16h1M16 17h1M16 18h1M17 33h1M16 34h1M17 35h1M29 47h1M28 48h2M29 49h1M29 50h1"
          ></path>
          <path stroke="#453c3c" d="M14 15h2M27 51h1"></path>
          <path
            stroke="#ffb164"
            d="M12 16h4M12 17h4M14 18h2M17 30h1M16 31h2M16 32h2M16 33h1M15 34h1M17 34h3M18 35h1"
          ></path>
          <path stroke="#793d4e" d="M17 17h1M17 18h2M17 19h1M17 20h1"></path>
          <path
            stroke="#888c78"
            d="M19 18h2M18 19h3M18 20h3M18 21h3M19 22h1M19 23h1M18 24h1M18 25h1M17 26h2M23 26h1M17 27h2M22 27h2M18 28h1M22 28h1M21 29h2M20 30h2M20 31h1M19 32h2M18 33h3M20 34h1M19 35h2M17 36h4M16 37h5M12 38h9M13 39h8M14 40h6M15 41h3"
          ></path>
          <path
            stroke="#c0b10a"
            d="M16 19h1M16 20h1M15 21h3M15 22h3M22 22h1M15 23h2M22 23h1M15 24h2M21 24h2M21 25h3M21 26h2M21 27h1M24 27h1M23 28h3M23 29h4M22 30h5M21 31h7M21 32h7M21 33h6M21 34h6M21 35h5M22 36h4M22 37h4M28 37h1M22 38h4M28 38h2M22 39h4M28 39h3M22 40h4M28 40h4M22 41h4M27 41h6M22 42h4M27 42h4M23 43h3M27 43h3M24 44h6M25 45h5M25 46h5M26 47h3"
          ></path>
          <path
            stroke="#585651"
            d="M18 22h1M18 23h1M19 24h1M19 25h1M19 26h1M17 28h1M19 30h1M18 31h2M18 32h1M16 36h1M15 37h1M11 38h1M20 40h1M18 41h2"
          ></path>
          <path
            stroke="#5b6731"
            d="M20 22h2M17 23h1M20 23h2M17 24h1M20 24h1M16 25h2M20 25h1M16 26h1M20 26h1M19 27h2M19 28h3M19 29h2M27 33h1M27 34h1M26 35h2M21 36h1M26 36h1M21 37h1M26 37h2M21 38h1M26 38h2M21 39h1M26 39h2M21 40h1M26 40h2M20 41h2M26 41h1M33 41h1M18 42h4M26 42h1M31 42h2M19 43h4M26 43h1M30 43h2M21 44h3M30 44h1M23 45h2"
          ></path>
          <path stroke="#dadfc3" d="M17 29h2M16 30h1M18 30h1"></path>
          <path
            stroke="#331a19"
            d="M30 45h1M30 46h2M30 47h2M30 48h2M26 50h2M30 50h1M25 51h1M28 51h3M25 52h6"
          ></path>
          <path stroke="#79390a" d="M26 51h1"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          viewBox="0 -0.5 39 53"
          id="skip8"
        >
          <path
            stroke="#ce2038"
            d="M14 2h5M13 3h1M17 3h2M12 4h2M18 4h2M11 5h2M19 5h1M11 6h1M19 6h1M19 7h2M19 8h2M11 9h1M17 9h4M11 10h1M18 10h3M11 11h1M18 11h3M11 12h1M19 12h1M20 13h4M22 14h3M24 15h1M24 16h1M24 17h1"
          ></path>
          <path
            stroke="#8a0b41"
            d="M14 3h3M14 4h4M13 5h1M17 5h2M12 6h1M18 6h1M12 7h1M18 7h1M18 8h1M17 10h1M17 11h1M12 12h1M17 12h2M11 13h4M17 13h3M12 14h3M19 14h3M21 15h3M22 16h2M22 17h2M22 18h1"
          ></path>
          <path
            stroke="#d77e4b"
            d="M14 5h3M13 6h5M13 7h1M16 7h2M17 8h1M16 9h1M16 10h1M15 11h2M14 12h2M15 14h1M15 15h2M15 16h2M26 20h1M25 21h2M7 22h1M7 24h1M28 45h1M27 46h2M28 47h1M28 48h1M28 49h1"
          ></path>
          <path
            stroke="#453c3c"
            d="M14 7h2M16 8h1M21 17h1M21 18h1M21 19h1M21 20h1M23 20h1M23 21h1"
          ></path>
          <path
            stroke="#ffb164"
            d="M12 8h4M12 9h4M12 10h4M12 11h3M13 12h1M5 22h2M6 23h3M8 24h2"
          ></path>
          <path
            stroke="#793d4e"
            d="M16 12h1M15 13h2M16 14h1M24 22h2M19 37h1M17 38h2M18 39h1M18 40h1M18 42h1M25 51h1M27 51h1"
          ></path>
          <path
            stroke="#c0b10a"
            d="M17 14h2M14 15h1M17 15h1M13 16h2M17 16h1M13 17h5M13 18h5M13 19h4M13 20h3M20 23h1M19 24h3M18 25h5M17 26h7M17 27h7M17 28h6M17 29h6M17 30h5M17 31h4M18 32h6M7 33h2M19 33h7M6 34h2M20 34h6M20 35h7M20 36h8M21 37h9M21 38h13M22 39h11M22 40h10M22 41h9M23 42h7M23 43h7M24 44h5M26 45h2"
          ></path>
          <path
            stroke="#585651"
            d="M18 15h1M20 17h1M20 18h1M19 19h1M22 19h2M17 20h1M22 20h1M24 20h2M14 21h2M24 21h1M15 22h2"
          ></path>
          <path
            stroke="#888c78"
            d="M19 15h2M18 16h4M18 17h2M18 18h2M17 19h2M16 20h1M18 20h1M16 21h2M12 22h3M12 23h3M19 23h1M11 24h1M18 24h1M17 25h1M16 26h1M14 27h3M13 28h4M12 29h5M10 30h7M9 31h8M8 32h9M9 33h8M11 34h5M13 35h3M14 36h1"
          ></path>
          <path
            stroke="#5b6731"
            d="M20 19h1M19 20h2M18 21h2M17 22h3M15 23h4M15 24h3M15 25h2M15 26h1M23 28h1M23 29h1M22 30h2M21 31h3M17 32h1M17 33h2M8 34h3M16 34h4M6 35h7M16 35h4M8 36h6M15 36h5M10 37h9M11 38h6M12 39h3"
          ></path>
          <path stroke="#dadfc3" d="M9 23h3M10 24h1"></path>
          <path
            stroke="#331a19"
            d="M20 37h1M19 38h2M19 39h2M17 40h1M19 40h2M17 41h4M17 42h1M19 42h2M18 43h3M29 47h1M29 48h2M27 49h1M29 49h2M25 50h6M28 51h2M25 52h4"
          ></path>
          <path stroke="#79390a" d="M26 51h1"></path>
        </symbol>
      </svg>
    </div>
  );
};
export const DancingGirlSlides = () => {
  return (
    <svg width="0" height="0" style={{ display: "none" }}>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="slide1"
      >
        <path
          stroke="#ce2038"
          d="M19 5h3M17 6h4M22 6h4M16 7h5M24 7h2M16 8h5M26 8h1M16 9h4M26 9h1M26 10h1M16 11h2M26 11h2M16 12h3M27 12h1M16 13h4M27 13h1M16 14h4M27 14h1M14 15h6M13 16h6M13 17h5M13 18h5M14 19h4M16 20h2"
        ></path>
        <path
          stroke="#8a0b41"
          d="M21 6h1M21 7h3M21 8h5M24 9h2M17 10h2M25 10h1M18 11h1M25 11h1M25 12h2M25 13h2M25 14h2M20 15h3M19 16h1M18 17h2M18 18h1M18 19h1"
        ></path>
        <path
          stroke="#ffb164"
          d="M30 7h2M30 8h1M32 8h1M32 9h1M30 10h1M23 12h2M21 13h4M22 14h2M9 20h2M7 21h2M11 21h1M10 23h1"
        ></path>
        <path
          stroke="#d77e4b"
          d="M31 8h1M20 9h4M30 9h2M19 10h3M24 10h1M31 10h2M19 11h4M24 11h1M31 11h3M21 12h2M32 12h2M20 13h1M20 14h2M23 16h3M24 17h2M25 18h1M9 21h2M8 22h6M11 23h3M14 44h1M14 45h1M13 46h2M28 47h1"
        ></path>
        <path stroke="#453c3c" d="M22 10h2M23 11h1M19 12h2"></path>
        <path
          stroke="#dadfc3"
          d="M34 12h1M33 13h2M33 14h1M14 22h1M14 23h1"
        ></path>
        <path
          stroke="#793d4e"
          d="M24 14h1M23 15h2M15 44h2M15 45h2M15 46h1M13 47h2M27 47h1M13 48h1M28 48h1M13 51h1M27 51h1"
        ></path>
        <path
          stroke="#888c78"
          d="M34 14h1M28 15h4M33 15h1M20 16h1M30 16h2M20 17h1M23 17h1M26 17h1M19 18h2M24 18h1M26 18h1M29 18h1M19 19h1M19 20h1M26 21h1M29 21h1M16 22h3M14 24h1M28 25h1M26 26h3M24 27h5M23 28h6M21 29h8M18 30h10M14 31h14M11 32h17M10 33h17M14 34h13M16 35h10M16 36h10M17 37h7M18 38h4"
        ></path>
        <path
          stroke="#585651"
          d="M35 14h1M34 15h2M28 16h2M32 16h1M34 16h2M21 17h1M29 17h7M21 18h1M30 18h5M20 19h1M32 19h3M18 20h1M20 20h1M18 21h3M15 22h1M19 22h1M15 23h5M15 24h3M28 24h1M23 25h5M22 26h4M22 27h2M21 28h2M20 29h1M11 34h3M14 35h2M26 35h1M24 37h2M22 38h3M19 39h5M20 40h3M20 41h2M20 42h1"
        ></path>
        <path
          stroke="#c0b10a"
          d="M25 15h2M21 16h2M26 16h2M22 17h1M27 17h2M22 18h2M27 18h2M22 19h8M21 20h9M21 21h5M27 21h2M22 22h3M29 26h1M29 27h2M29 28h2M29 29h3M28 30h4M28 31h4M28 32h4M27 33h4M27 34h4M27 35h4M14 36h2M26 36h4M13 37h4M26 37h4M12 38h6M25 38h5M11 39h8M24 39h6M11 40h9M25 40h5M11 41h9M25 41h4M13 42h7M25 42h4M15 43h3M25 43h4M26 44h3M26 45h3M26 46h3"
        ></path>
        <path
          stroke="#5b6731"
          d="M27 15h1M21 19h1M21 22h1M25 22h4M22 23h7M22 24h6M22 25h1M29 25h1M31 28h1M31 33h1M30 36h1M23 40h2M22 41h3M29 41h1M21 42h4M29 42h1M18 43h7M17 44h9M19 45h7M22 46h4"
        ></path>
        <path
          stroke="#331a19"
          d="M12 47h1M12 48h1M14 48h1M27 48h1M29 48h1M11 49h4M27 49h3M11 50h4M25 50h5M10 51h1M24 51h1M28 51h1M10 52h4M24 52h4"
        ></path>
        <path stroke="#79390a" d="M11 51h2M25 51h2"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="slide2"
      >
        <path
          stroke="#ce2038"
          d="M21 7h5M20 8h10M20 9h5M26 9h5M20 10h5M29 10h2M20 11h4M30 11h1M22 12h1M31 13h1M21 14h1M31 14h2M20 15h3M31 15h2M19 16h4M31 16h2M19 17h3M19 18h4M19 19h3M20 20h1"
        ></path>
        <path
          stroke="#8a0b41"
          d="M25 9h1M25 10h4M28 11h2M20 12h2M29 12h2M20 13h3M29 13h2M22 14h1M29 14h2M23 15h1M29 15h2M23 16h1M29 16h2M22 17h4"
        ></path>
        <path
          stroke="#ffb164"
          d="M31 9h2M31 10h1M33 10h1M33 11h1M31 12h1M27 14h2M25 15h4M26 16h2M11 20h2M9 21h2M13 21h1M11 23h2"
        ></path>
        <path
          stroke="#d77e4b"
          d="M32 10h1M24 11h4M31 11h2M23 12h3M28 12h1M32 12h2M23 13h4M28 13h1M32 13h3M25 14h2M33 14h2M24 15h1M24 16h2M26 18h3M27 19h2M28 20h1M11 21h2M10 22h5M13 23h2"
        ></path>
        <path stroke="#453c3c" d="M26 12h2M27 13h1M23 14h2"></path>
        <path
          stroke="#dadfc3"
          d="M35 14h1M34 15h2M34 16h1M15 22h1M15 23h1"
        ></path>
        <path
          stroke="#585651"
          d="M33 15h1M33 16h1M36 16h1M31 17h3M35 17h2M23 18h1M31 18h6M24 19h1M32 19h5M23 20h2M34 20h3M23 21h1M16 22h1M20 22h3M16 23h2M20 23h2M18 24h3M27 26h4M24 27h5M31 36h1M21 37h2M19 38h3M30 38h1M17 39h3M28 39h2M27 40h3M25 41h4M24 42h5M25 43h3M26 44h2"
        ></path>
        <path
          stroke="#793d4e"
          d="M28 16h1M26 17h2M21 43h2M20 44h3M20 45h2M25 45h1M20 46h1M25 46h3M25 47h2M25 48h2M18 49h2M17 50h1M27 51h1"
        ></path>
        <path
          stroke="#888c78"
          d="M35 16h1M34 17h1M22 19h2M26 19h1M29 19h1M21 20h2M27 20h1M29 20h1M32 20h1M20 21h3M17 22h3M18 23h2M29 23h1M32 23h1M29 27h2M23 28h8M22 29h9M22 30h9M21 31h10M21 32h11M20 33h12M19 34h13M19 35h13M17 36h14M16 37h5M23 37h8M16 38h3M22 38h8M20 39h8M20 40h7M22 41h3"
        ></path>
        <path
          stroke="#c0b10a"
          d="M28 17h2M24 18h2M29 18h2M25 19h1M30 19h2M25 20h2M30 20h2M25 21h8M24 22h9M24 23h5M30 23h2M25 24h3M21 30h1M31 30h1M31 31h1M20 32h1M19 33h1M18 34h1M17 35h2M16 36h1M14 37h2M31 37h1M14 38h2M31 38h1M14 39h3M30 39h2M15 40h5M30 40h2M16 41h6M29 41h2M17 42h4M29 42h2M28 43h3M28 44h2M28 45h1"
        ></path>
        <path
          stroke="#5b6731"
          d="M30 17h1M24 21h1M24 24h1M28 24h3M24 25h7M24 26h3M31 28h1M31 29h1M15 36h1M31 41h1M21 42h3M23 43h2M24 44h2M30 44h1M26 45h2"
        ></path>
        <path
          stroke="#331a19"
          d="M19 46h1M21 46h1M18 47h4M18 48h4M17 49h1M20 49h1M25 49h2M20 50h1M25 50h3M17 51h3M24 51h1M24 52h4"
        ></path>
        <path stroke="#79390a" d="M18 50h2M25 51h2"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="slide3"
      >
        <path
          stroke="#ce2038"
          d="M23 7h4M22 8h7M22 9h8M22 10h6M29 10h3M23 11h5M29 11h2M30 12h2M31 13h1M34 13h2M22 14h1M31 14h1M34 14h2M22 15h1M32 15h1M35 15h2M22 16h1M32 16h1M35 16h2M32 17h1M35 17h2M32 18h1M35 18h1M35 19h1"
        ></path>
        <path
          stroke="#ffb164"
          d="M33 9h1M32 10h1M31 11h2M32 12h2M33 13h1M24 15h3M10 16h3M23 16h5M13 17h1M24 17h4M12 18h1"
        ></path>
        <path
          stroke="#8a0b41"
          d="M28 10h1M22 11h1M28 11h1M22 12h1M28 12h2M29 13h2M29 14h2M29 15h3M29 16h3M23 17h1M28 17h4M24 18h1"
        ></path>
        <path
          stroke="#d77e4b"
          d="M33 10h1M33 11h2M23 12h5M34 12h1M25 13h1M28 13h1M32 13h1M24 14h3M28 14h1M32 14h2M23 15h1M27 15h2M33 15h1M28 16h1M33 16h1M10 17h3M10 18h1M13 18h2M14 19h2M25 19h3M26 20h2M27 21h1M21 45h1M21 46h1M20 47h2M20 48h1"
        ></path>
        <path stroke="#453c3c" d="M23 13h2M26 13h2M23 14h1M27 14h1"></path>
        <path
          stroke="#dadfc3"
          d="M34 15h1M34 16h1M33 17h1M16 19h1M15 20h2"
        ></path>
        <path
          stroke="#888c78"
          d="M34 17h1M21 18h2M30 18h2M34 18h1M20 19h2M31 19h2M17 20h1M19 20h2M25 20h1M28 20h1M17 21h1M26 21h1M28 21h1M31 21h1M28 24h1M31 24h1M27 28h3M23 29h8M23 30h8M23 31h10M23 32h10M23 33h12M23 34h13M23 35h13M23 36h13M24 37h11M24 38h10M24 39h10M25 40h8M25 41h7M26 42h5"
        ></path>
        <path
          stroke="#c0b10a"
          d="M23 18h1M28 18h1M23 19h2M28 19h2M24 20h1M29 20h2M24 21h2M29 21h2M24 22h8M23 23h9M23 24h5M29 24h2M24 25h3M23 28h1M30 28h1M22 29h1M22 30h1M21 31h2M21 32h2M21 33h2M21 34h2M21 35h2M21 36h2M21 37h2M21 38h2M34 38h1M21 39h2M34 39h1M21 40h3M33 40h2M21 41h2M32 41h2M21 42h2M31 42h3M21 43h2M27 43h6M26 44h6M25 45h5"
        ></path>
        <path
          stroke="#793d4e"
          d="M25 18h3M21 44h1M22 45h1M22 46h1M25 46h2M22 47h1M25 47h2M20 51h1M25 51h1"
        ></path>
        <path
          stroke="#585651"
          d="M29 18h1M33 18h1M22 19h1M30 19h1M33 19h2M21 20h3M31 20h4M16 21h1M18 21h6M32 21h3M17 22h4M33 22h2M18 23h3M23 27h7M24 28h3M23 37h1M23 38h1M23 39h1M24 40h1M24 41h1M24 42h2M24 43h3"
        ></path>
        <path
          stroke="#5b6731"
          d="M23 22h1M23 25h1M27 25h3M23 26h7M23 41h1M34 41h1M23 42h1M23 43h1M22 44h4M24 45h1M30 45h1"
        ></path>
        <path
          stroke="#331a19"
          d="M21 48h1M25 48h2M19 49h3M25 49h2M19 50h4M24 50h3M19 51h1M23 51h1M26 51h1M20 52h7"
        ></path>
        <path stroke="#79390a" d="M21 51h2M24 51h1"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="slide4"
      >
        <path
          stroke="#ce2038"
          d="M24 6h6M23 7h1M25 7h5M22 8h2M26 8h6M22 9h2M26 9h3M30 9h2M27 10h2M30 10h2M21 11h2M30 11h3M21 12h2M30 12h3M21 13h2M31 13h2M21 14h2M32 14h1M22 15h1M29 15h2M32 15h1M35 15h1M30 16h2M34 16h2M34 17h2M33 18h2M33 19h2M33 20h2M33 21h1"
        ></path>
        <path
          stroke="#8a0b41"
          d="M24 7h1M24 8h2M24 9h2M29 9h1M22 10h3M29 10h1M29 11h1M29 12h1M29 13h2M29 14h3M28 15h1M31 15h1M23 16h1M27 16h3M26 17h1M28 17h2M29 18h1"
        ></path>
        <path
          stroke="#d77e4b"
          d="M25 10h2M23 11h6M23 12h1M26 12h3M35 12h2M23 13h1M25 13h2M34 13h2M27 14h1M35 14h1M33 15h1M7 16h2M32 16h2M8 17h2M11 17h2M12 18h2M25 19h2M26 20h1M19 44h1M19 45h1M19 46h1M19 47h1"
        ></path>
        <path
          stroke="#ffb164"
          d="M35 11h1M34 12h1M33 13h1M36 13h1M23 14h4M33 14h2M7 15h2M23 15h5M34 15h1M6 16h1M9 16h2M24 16h3M10 17h1M11 18h1"
        ></path>
        <path stroke="#453c3c" d="M24 12h2M24 13h1M27 13h2M28 14h1"></path>
        <path
          stroke="#888c78"
          d="M20 16h2M17 17h4M18 18h2M22 18h1M26 18h2M31 18h2M13 19h2M19 19h1M21 19h1M24 19h1M27 19h1M31 19h2M21 20h1M25 20h1M27 20h1M31 20h1M21 21h1M29 22h1M21 23h1M21 24h1M20 25h4M20 26h6M20 27h7M20 28h7M20 29h8M20 30h9M19 31h10M19 32h13M19 33h13M19 34h13M20 35h12M20 36h5M26 36h5M20 37h6M27 37h4M20 38h6M28 38h2M20 39h7M21 40h6M22 41h5M23 42h4"
        ></path>
        <path
          stroke="#585651"
          d="M22 16h1M21 17h2M30 17h1M15 18h3M20 18h2M30 18h1M15 19h4M30 19h1M15 20h3M30 20h1M32 20h1M30 21h3M21 22h1M30 22h3M30 23h3M25 36h1M26 37h1M26 38h2M27 39h3M27 40h2M27 41h1"
        ></path>
        <path stroke="#dadfc3" d="M13 17h2M31 17h3M14 18h1"></path>
        <path
          stroke="#c0b10a"
          d="M23 17h1M27 17h1M23 18h1M28 18h1M22 19h2M28 19h2M22 20h3M28 20h2M22 21h8M22 22h7M23 23h5M20 24h1M27 27h1M19 28h1M27 28h2M19 29h1M28 29h2M19 30h1M29 30h1M18 31h1M29 31h1M18 32h1M18 33h1M18 34h1M18 35h2M19 36h1M19 37h1M31 37h1M19 38h1M30 38h2M19 39h1M30 39h4M19 40h2M29 40h5M19 41h3M28 41h6M19 42h4M27 42h6M20 43h4M26 43h5M21 44h2M26 44h4M26 45h2"
        ></path>
        <path
          stroke="#793d4e"
          d="M24 17h2M24 18h2M19 43h1M20 44h1M20 45h2M20 46h2M26 46h2M20 47h1M26 47h2M19 51h1M22 51h1M26 51h1"
        ></path>
        <path
          stroke="#5b6731"
          d="M22 23h1M22 24h6M24 25h3M26 26h1M19 27h1M18 36h1M31 36h1M24 43h2M23 44h3M25 45h1"
        ></path>
        <path
          stroke="#331a19"
          d="M18 48h3M26 48h2M18 49h3M26 49h2M18 50h4M25 50h3M27 51h1M19 52h4M25 52h3"
        ></path>
        <path stroke="#79390a" d="M20 51h2M25 51h1"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="slide5"
      >
        <path
          stroke="#ce2038"
          d="M17 5h3M13 6h4M18 6h4M13 7h2M18 7h5M12 8h1M18 8h5M12 9h1M19 9h4M12 10h1M11 11h2M21 11h2M11 12h1M20 12h3M11 13h1M19 13h4M11 14h1M19 14h4M19 15h6M20 16h6M21 17h5M21 18h5M21 19h4M21 20h2"
        ></path>
        <path
          stroke="#8a0b41"
          d="M17 6h1M15 7h3M13 8h5M13 9h2M13 10h1M20 10h2M13 11h1M20 11h1M12 12h2M12 13h2M12 14h2M16 15h3M19 16h1M19 17h2M20 18h1M20 19h1"
        ></path>
        <path
          stroke="#ffb164"
          d="M7 7h2M6 8h1M8 8h1M6 9h1M8 10h1M14 12h2M14 13h4M15 14h2M28 20h2M27 21h1M30 21h2M28 23h1"
        ></path>
        <path
          stroke="#d77e4b"
          d="M7 8h1M7 9h2M15 9h4M6 10h2M14 10h1M17 10h3M5 11h3M14 11h1M16 11h4M5 12h2M16 12h2M18 13h1M17 14h2M13 16h3M13 17h2M13 18h1M28 21h2M25 22h6M25 23h3M24 44h1M24 45h1M24 46h2M10 47h1"
        ></path>
        <path stroke="#453c3c" d="M15 10h2M15 11h1M18 12h2"></path>
        <path stroke="#dadfc3" d="M4 12h1M4 13h2M5 14h1M24 22h1M24 23h1"></path>
        <path
          stroke="#585651"
          d="M3 14h1M3 15h2M3 16h2M6 16h1M9 16h2M3 17h7M17 17h1M4 18h5M17 18h1M4 19h3M18 19h1M18 20h1M20 20h1M18 21h3M19 22h1M23 22h1M19 23h5M10 24h1M21 24h3M11 25h5M13 26h4M23 31h2M11 32h1M27 32h1M12 35h1M18 35h3M13 36h1M19 36h4M13 37h2M20 37h2M14 38h2M20 38h1M15 39h2M16 40h3M17 41h2M18 42h1"
        ></path>
        <path
          stroke="#888c78"
          d="M4 14h1M5 15h1M7 15h4M7 16h2M18 16h1M12 17h1M15 17h1M18 17h1M9 18h1M12 18h1M14 18h1M18 18h2M19 19h1M19 20h1M9 21h1M12 21h1M20 22h3M24 24h1M10 25h1M10 26h3M10 27h7M10 28h8M10 29h9M11 30h10M11 31h12M12 32h15M12 33h17M12 34h16M13 35h5M21 35h4M14 36h5M15 37h5M16 38h4M17 39h3"
        ></path>
        <path
          stroke="#793d4e"
          d="M14 14h1M14 15h2M22 44h2M22 45h2M23 46h1M11 47h1M24 47h2M10 48h1M25 48h1M11 51h1M25 51h1"
        ></path>
        <path
          stroke="#5b6731"
          d="M11 15h1M17 19h1M10 22h4M17 22h1M10 23h7M11 24h6M16 25h1M7 33h1M8 36h1M9 41h1M14 43h2M15 44h4M15 45h5M15 46h2"
        ></path>
        <path
          stroke="#c0b10a"
          d="M12 15h2M11 16h2M16 16h2M10 17h2M16 17h1M10 18h2M15 18h2M9 19h8M9 20h9M10 21h2M13 21h5M14 22h3M9 25h1M9 26h1M8 27h2M7 28h3M7 29h3M7 30h4M7 31h4M7 32h4M8 33h4M8 34h4M8 35h4M9 36h4M23 36h2M9 37h4M22 37h4M9 38h5M21 38h6M9 39h6M20 39h8M9 40h7M19 40h9M10 41h7M19 41h9M10 42h8M19 42h7M10 43h4M16 43h8M10 44h5M19 44h3M10 45h5M10 46h5"
        ></path>
        <path
          stroke="#331a19"
          d="M26 47h1M9 48h1M11 48h1M24 48h1M26 48h1M9 49h3M24 49h4M9 50h5M24 50h4M10 51h1M14 51h1M28 51h1M11 52h4M25 52h4"
        ></path>
        <path stroke="#79390a" d="M12 51h2M26 51h2"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="slide6"
      >
        <path
          stroke="#ce2038"
          d="M13 7h5M9 8h10M8 9h5M14 9h5M8 10h2M14 10h5M8 11h1M15 11h4M16 12h1M7 13h1M6 14h2M17 14h1M6 15h2M16 15h3M6 16h2M16 16h4M17 17h3M16 18h4M17 19h3M18 20h1"
        ></path>
        <path
          stroke="#ffb164"
          d="M6 9h2M5 10h1M7 10h1M5 11h1M7 12h1M10 14h2M10 15h4M11 16h2M26 20h2M25 21h1M28 21h2M26 23h2"
        ></path>
        <path
          stroke="#8a0b41"
          d="M13 9h1M10 10h4M9 11h2M8 12h2M17 12h2M8 13h2M16 13h3M8 14h2M16 14h1M8 15h2M15 15h1M8 16h2M15 16h1M13 17h4"
        ></path>
        <path
          stroke="#d77e4b"
          d="M6 10h1M6 11h2M11 11h4M5 12h2M10 12h1M13 12h3M4 13h3M10 13h1M12 13h4M4 14h2M12 14h2M14 15h1M13 16h2M10 18h3M10 19h2M10 20h1M26 21h2M24 22h5M24 23h2"
        ></path>
        <path stroke="#453c3c" d="M11 12h2M11 13h1M14 14h2"></path>
        <path stroke="#dadfc3" d="M3 14h1M3 15h2M4 16h1M23 22h1M23 23h1"></path>
        <path
          stroke="#585651"
          d="M5 15h1M2 16h1M5 16h1M2 17h2M5 17h3M2 18h6M15 18h1M2 19h5M14 19h1M2 20h3M14 20h2M15 21h1M16 22h3M22 22h1M17 23h2M21 23h2M18 24h3M8 26h4M10 27h5M7 34h1M7 35h1M7 36h1M8 37h1M17 37h1M8 38h2M18 38h3M9 39h3M19 39h2M9 40h4M10 41h5M10 42h5M11 43h3M11 44h2"
        ></path>
        <path
          stroke="#888c78"
          d="M3 16h1M4 17h1M9 19h1M12 19h1M15 19h2M6 20h1M9 20h1M11 20h1M16 20h2M16 21h3M19 22h3M6 23h1M9 23h1M19 23h2M8 27h2M8 28h8M8 29h9M8 30h9M8 31h10M7 32h11M7 33h12M8 34h12M8 35h12M8 36h14M9 37h8M18 37h4M10 38h8M21 38h1M12 39h7M13 40h6M15 41h2"
        ></path>
        <path
          stroke="#793d4e"
          d="M10 16h1M11 17h2M16 43h2M16 44h3M13 45h1M17 45h2M11 46h3M18 46h1M12 47h2M12 48h2M19 49h2M21 50h1M11 51h1"
        ></path>
        <path
          stroke="#5b6731"
          d="M8 17h1M14 21h1M8 24h3M14 24h1M8 25h7M12 26h3M7 40h1M7 41h1M7 42h1M15 42h2M14 43h2M8 44h1M13 44h2"
        ></path>
        <path
          stroke="#c0b10a"
          d="M9 17h2M8 18h2M13 18h2M7 19h2M13 19h1M7 20h2M12 20h2M6 21h8M6 22h9M7 23h2M10 23h5M11 24h3M7 28h1M7 29h1M7 30h1M17 30h1M7 31h1M18 32h1M19 33h1M20 34h1M20 35h2M22 36h2M7 37h1M22 37h3M7 38h1M22 38h3M7 39h2M21 39h4M8 40h1M19 40h5M8 41h2M17 41h6M8 42h2M17 42h5M8 43h3M9 44h2M10 45h3"
        ></path>
        <path
          stroke="#331a19"
          d="M17 46h1M19 46h1M17 47h4M17 48h4M12 49h2M18 49h1M21 49h1M11 50h3M18 50h1M14 51h1M19 51h3M11 52h4"
        ></path>
        <path stroke="#79390a" d="M19 50h2M12 51h2"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="slide7"
      >
        <path
          stroke="#ce2038"
          d="M12 7h4M10 8h7M9 9h8M7 10h3M11 10h6M8 11h2M11 11h5M7 12h2M3 13h2M7 13h1M3 14h2M7 14h1M16 14h1M2 15h2M6 15h1M16 15h1M2 16h2M6 16h1M16 16h1M2 17h2M6 17h1M3 18h1M6 18h1M3 19h1"
        ></path>
        <path
          stroke="#ffb164"
          d="M5 9h1M6 10h1M6 11h2M5 12h2M5 13h1M12 15h3M11 16h5M26 16h3M11 17h4M25 17h1M26 18h1"
        ></path>
        <path
          stroke="#d77e4b"
          d="M5 10h1M4 11h2M4 12h1M11 12h5M6 13h1M10 13h1M13 13h1M5 14h2M10 14h1M12 14h3M5 15h1M10 15h2M15 15h1M5 16h1M10 16h1M26 17h2M24 18h2M11 19h3M23 19h2M11 20h2M11 21h1M17 45h1M17 46h1M17 47h2M18 48h1"
        ></path>
        <path
          stroke="#8a0b41"
          d="M10 10h1M10 11h1M16 11h1M9 12h2M16 12h1M8 13h2M8 14h2M7 15h3M7 16h3M7 17h4M15 17h1M14 18h1"
        ></path>
        <path stroke="#453c3c" d="M11 13h2M14 13h2M11 14h1M15 14h1"></path>
        <path stroke="#dadfc3" d="M4 15h1M4 16h1M5 17h1M22 19h1M22 20h2"></path>
        <path
          stroke="#888c78"
          d="M4 17h1M4 18h1M7 18h2M16 18h2M6 19h2M17 19h2M10 20h1M13 20h1M18 20h2M21 20h1M7 21h1M10 21h1M12 21h1M21 21h1M7 24h1M10 24h1M9 28h3M8 29h8M8 30h8M6 31h10M6 32h10M4 33h12M3 34h13M3 35h13M3 36h7M11 36h5M4 37h6M11 37h4M5 38h5M11 38h4M5 39h4M11 39h4M6 40h3M11 40h4M7 41h1M11 41h4M11 42h4M12 43h3"
        ></path>
        <path
          stroke="#585651"
          d="M5 18h1M9 18h1M4 19h2M8 19h1M16 19h1M4 20h4M15 20h3M4 21h3M15 21h6M22 21h1M4 22h2M18 22h4M18 23h3M9 27h7M12 28h3M10 36h1M10 37h1M15 37h1M10 38h1M15 38h1M9 39h2M15 39h1M9 40h2M8 41h3M8 42h3"
        ></path>
        <path
          stroke="#c0b10a"
          d="M10 18h1M15 18h1M9 19h2M14 19h2M8 20h2M14 20h1M8 21h2M13 21h2M7 22h8M7 23h9M8 24h2M11 24h5M12 25h3M8 28h1M15 28h1M16 29h1M16 30h1M16 31h2M16 32h2M16 33h2M16 34h2M16 35h2M16 36h2M16 37h2M4 38h1M16 38h2M4 39h1M16 39h2M4 40h2M15 40h3M4 41h3M15 41h3M5 42h3M15 42h3M6 43h5M15 43h3M7 44h5M15 44h2M8 45h5"
        ></path>
        <path
          stroke="#793d4e"
          d="M11 18h3M17 44h1M16 45h1M12 46h2M16 46h1M12 47h2M16 47h1M13 51h1M18 51h1"
        ></path>
        <path
          stroke="#5b6731"
          d="M15 22h1M9 25h3M15 25h1M9 26h7M11 43h1M12 44h3M13 45h2"
        ></path>
        <path
          stroke="#331a19"
          d="M12 48h2M17 48h1M12 49h2M17 49h3M12 50h3M16 50h4M12 51h1M15 51h1M19 51h1M12 52h7"
        ></path>
        <path stroke="#79390a" d="M14 51h1M16 51h2"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="slide8"
      >
        <path
          stroke="#ce2038"
          d="M9 6h6M9 7h5M15 7h1M7 8h6M15 8h2M7 9h2M10 9h3M15 9h2M7 10h2M10 10h2M6 11h3M16 11h2M6 12h3M16 12h2M6 13h2M16 13h2M6 14h1M16 14h2M3 15h1M6 15h1M8 15h2M16 15h1M3 16h2M7 16h2M3 17h2M4 18h2M4 19h2M4 20h2M5 21h1"
        ></path>
        <path
          stroke="#8a0b41"
          d="M14 7h1M13 8h2M9 9h1M13 9h2M9 10h1M14 10h3M9 11h1M9 12h1M8 13h2M7 14h3M7 15h1M10 15h1M9 16h3M15 16h1M9 17h2M9 18h1M11 18h2"
        ></path>
        <path
          stroke="#d77e4b"
          d="M12 10h2M10 11h6M2 12h2M10 12h3M15 12h1M3 13h2M12 13h2M15 13h1M3 14h1M11 14h1M5 15h1M5 16h2M30 16h2M26 17h2M29 17h2M25 18h2M12 19h2M12 20h1M19 44h1M19 45h1M19 46h1M19 47h1"
        ></path>
        <path
          stroke="#ffb164"
          d="M3 11h1M4 12h1M2 13h1M5 13h1M4 14h2M12 14h4M4 15h1M11 15h5M30 15h2M12 16h3M28 16h2M32 16h1M28 17h1M27 18h1"
        ></path>
        <path stroke="#453c3c" d="M13 12h2M10 13h2M14 13h1M10 14h1"></path>
        <path
          stroke="#585651"
          d="M16 16h1M8 17h1M16 17h2M8 18h1M17 18h2M21 18h3M8 19h1M20 19h4M6 20h1M8 20h1M21 20h3M6 21h3M6 22h3M17 22h1M6 23h3M13 35h1M12 36h2M11 37h2M10 38h3M9 39h3M11 40h1M11 41h1"
        ></path>
        <path
          stroke="#888c78"
          d="M17 16h2M18 17h4M6 18h2M16 18h1M19 18h2M6 19h2M11 19h1M14 19h1M17 19h1M19 19h1M24 19h2M7 20h1M11 20h1M13 20h1M17 20h1M17 21h1M9 22h1M15 23h1M17 23h1M17 24h1M15 25h4M13 26h6M12 27h7M12 28h7M11 29h8M10 30h9M10 31h10M7 32h13M7 33h13M7 34h12M7 35h6M14 35h5M8 36h4M14 36h5M8 37h3M13 37h6M9 38h1M13 38h6M12 39h7M12 40h6M12 41h5M12 42h4"
        ></path>
        <path stroke="#dadfc3" d="M5 17h3M24 17h2M24 18h1"></path>
        <path
          stroke="#c0b10a"
          d="M11 17h1M15 17h1M10 18h1M15 18h1M9 19h2M15 19h2M9 20h2M14 20h3M9 21h8M10 22h6M11 23h4M18 24h1M11 27h1M10 28h2M19 28h1M9 29h2M19 29h1M9 30h1M19 30h1M9 31h1M20 31h1M20 32h1M20 33h1M19 34h2M19 35h2M19 36h1M7 37h1M19 37h1M7 38h2M19 38h1M5 39h4M19 39h1M5 40h6M18 40h2M5 41h6M17 41h3M6 42h6M16 42h4M8 43h7M16 43h3M9 44h5M16 44h2M11 45h3"
        ></path>
        <path
          stroke="#793d4e"
          d="M12 17h3M13 18h2M19 43h1M18 44h1M17 45h2M11 46h2M17 46h2M11 47h2M18 47h1M12 51h1M16 51h1M19 51h1"
        ></path>
        <path
          stroke="#5b6731"
          d="M16 22h1M16 23h1M11 24h6M12 25h3M12 26h1M19 27h1M7 36h1M20 36h1M15 43h1M14 44h2"
        ></path>
        <path
          stroke="#331a19"
          d="M11 48h2M18 48h3M11 49h2M18 49h3M11 50h3M17 50h4M11 51h1M11 52h3M16 52h4"
        ></path>
        <path stroke="#79390a" d="M13 51h1M17 51h2"></path>
      </symbol>
    </svg>
  );
};
export const DancingGirlSnaps = () => {
  return (
    <svg width="0" height="0" style={{ display: "none" }}>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="snap1"
      >
        <path
          stroke="#ce2038"
          d="M15 9h3M13 10h6M12 11h7M10 12h5M16 12h3M10 13h4M17 13h2M10 14h4M9 15h3M9 16h3M19 16h1M9 17h3M9 18h5M19 18h1M9 19h6M19 19h1M10 20h5M18 20h2"
        ></path>
        <path
          stroke="#8a0b41"
          d="M15 12h1M14 13h2M14 14h1M12 15h2M18 15h1M12 16h2M12 17h2M19 17h1M14 18h1M18 18h1M17 19h2M17 20h1"
        ></path>
        <path
          stroke="#d77e4b"
          d="M16 13h1M15 14h3M14 15h1M14 16h1M14 17h1M21 20h1M11 21h1M16 21h1M21 21h1M11 22h1M16 22h2M22 22h1M10 23h1M17 23h1M22 23h1M10 24h1M15 47h2M15 48h1M14 49h1"
        ></path>
        <path stroke="#453c3c" d="M15 15h2M15 16h1"></path>
        <path
          stroke="#ffb164"
          d="M17 15h1M16 16h3M15 17h4M15 18h3M15 19h2M21 19h2M22 20h1M9 21h2M22 21h1M9 22h2M9 23h1"
        ></path>
        <path
          stroke="#793d4e"
          d="M15 20h2M26 47h1M14 48h1M16 48h1M25 48h2M25 49h1"
        ></path>
        <path
          stroke="#585651"
          d="M12 21h1M19 21h1M12 22h2M19 22h1M11 23h3M20 23h1M12 24h3M21 24h1M21 25h3M10 26h1M21 26h2M10 27h1M21 27h1M18 29h3M16 30h2M16 31h1M25 43h1M23 44h3"
        ></path>
        <path
          stroke="#c0b10a"
          d="M13 21h1M17 21h2M14 22h1M18 22h1M15 23h1M19 23h1M15 24h6M15 25h6M16 26h3M20 26h1M17 27h2M15 33h1M15 34h1M15 35h1M15 36h1M27 40h1M15 41h1M27 41h1M14 42h3M27 42h1M14 43h4M27 43h1M13 44h6M26 44h2M13 45h14M14 46h13M17 47h3M24 47h1"
        ></path>
        <path
          stroke="#888c78"
          d="M14 21h2M15 22h1M14 23h1M16 23h1M18 23h1M23 23h1M22 24h2M12 25h1M11 26h2M19 26h1M11 27h2M16 27h1M19 27h2M18 30h3M17 31h5M16 32h7M16 33h8M16 34h9M16 35h10M16 36h10M16 37h11M16 38h11M16 39h11M16 40h11M16 41h11M17 42h10M18 43h7M26 43h1M19 44h4"
        ></path>
        <path stroke="#dadfc3" d="M11 24h1M10 25h2"></path>
        <path
          stroke="#5b6731"
          d="M14 25h1M14 26h2M15 27h1M16 28h5M16 29h2M15 31h1M15 32h1M15 37h1M15 40h1M13 43h1M27 45h1M20 47h4M25 47h1"
        ></path>
        <path
          stroke="#331a19"
          d="M13 49h1M15 49h1M26 49h1M12 50h1M14 50h2M24 50h2M27 50h1M24 51h1M28 51h1M12 52h4M24 52h5"
        ></path>
        <path stroke="#5c3747" d="M13 50h1M26 50h1M15 51h1M25 51h1"></path>
        <path stroke="#79390a" d="M12 51h3M26 51h2"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="snap2"
      >
        <path
          stroke="#ce2038"
          d="M19 7h4M17 8h7M17 9h7M16 10h1M18 10h6M15 11h2M18 11h3M22 11h2M15 12h2M15 13h2M24 13h1M15 14h2M25 14h1M14 15h3M25 15h1M13 16h3M25 16h2M13 17h4M25 17h2M13 18h6M24 18h2M14 19h4M19 19h1M23 19h3M14 20h2"
        ></path>
        <path
          stroke="#8a0b41"
          d="M17 10h1M17 11h1M21 11h1M17 12h2M17 13h1M22 13h1M17 14h1M23 14h2M17 15h1M24 15h1M16 16h2M24 16h1M17 17h2M23 17h2M19 18h1M22 18h2"
        ></path>
        <path
          stroke="#d77e4b"
          d="M19 12h5M18 13h1M21 13h1M18 14h1M20 14h3M18 15h1M18 16h1M19 17h1M12 19h2M20 19h1M20 20h1M13 21h1M20 21h1M11 22h3M20 22h1M26 22h2M12 23h1M15 47h2M15 48h2M25 48h1M25 49h1"
        ></path>
        <path stroke="#453c3c" d="M19 13h2M23 13h1M19 14h1"></path>
        <path
          stroke="#ffb164"
          d="M19 15h5M19 16h5M20 17h3M27 19h2M11 20h3M27 20h2M11 21h2M27 21h2"
        ></path>
        <path
          stroke="#793d4e"
          d="M20 18h2M21 19h1M17 47h1M24 47h2M24 48h1M24 49h1"
        ></path>
        <path
          stroke="#5b6731"
          d="M18 19h1M22 19h1M17 20h1M22 20h1M17 21h1M20 26h1M17 27h2M23 27h1M17 28h1M23 28h1M17 29h1M24 30h1M16 31h1M24 31h1M16 32h1M25 33h1M26 36h1M15 37h1M27 40h1M21 44h2M20 45h3M19 46h4M27 46h1"
        ></path>
        <path
          stroke="#888c78"
          d="M16 20h1M19 20h1M21 20h1M23 20h1M15 21h2M19 21h1M21 21h1M23 21h2M15 22h2M19 22h1M21 22h1M24 22h1M15 23h2M20 23h1M26 23h2M15 24h1M20 24h1M20 25h1M18 26h2M21 26h2M19 29h3M18 30h5M18 31h5M18 32h6M18 33h6M17 34h7M17 35h8M17 36h8M16 37h10M16 38h10M16 39h11M16 40h11M16 41h11M17 42h7M25 42h2M17 43h5M25 43h1"
        ></path>
        <path
          stroke="#c0b10a"
          d="M18 20h1M18 21h1M22 21h1M17 22h2M22 22h2M17 23h3M21 23h3M17 24h3M21 24h3M17 25h3M21 25h3M23 29h1M17 30h1M23 30h1M17 31h1M23 31h1M17 32h1M24 32h1M16 33h2M24 33h1M16 34h1M24 34h2M16 35h1M25 35h1M16 36h1M25 36h1M26 37h1M15 38h1M26 38h1M15 39h1M15 40h1M15 41h1M27 41h1M15 42h1M27 42h1M15 43h2M26 43h2M15 44h6M23 44h5M15 45h5M23 45h5M15 46h4M23 46h4"
        ></path>
        <path stroke="#dadfc3" d="M13 23h1M12 24h2"></path>
        <path
          stroke="#585651"
          d="M14 23h1M24 23h2M14 24h1M16 24h1M24 24h3M13 25h4M24 25h3M13 26h3M24 26h3M14 27h2M19 27h4M25 27h1M18 28h5M18 29h1M22 29h1M16 42h1M24 42h1M22 43h3"
        ></path>
        <path
          stroke="#331a19"
          d="M14 49h3M26 49h1M13 50h2M16 50h2M24 50h2M27 50h1M13 51h1M13 52h5M24 52h4"
        ></path>
        <path
          stroke="#5c3747"
          d="M15 50h1M26 50h1M14 51h1M17 51h1M24 51h1M27 51h1"
        ></path>
        <path stroke="#79390a" d="M15 51h2M25 51h2"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="snap3"
      >
        <path
          stroke="#ce2038"
          d="M18 6h6M17 7h8M17 8h6M24 8h2M17 9h6M25 9h1M18 10h4M25 10h2M25 11h2M17 12h1M25 12h2M17 13h1M26 13h1M16 14h2M26 14h2M15 15h3M26 15h2M15 16h2M25 16h3M15 17h2M25 17h1M16 18h1M24 18h1M17 19h2"
        ></path>
        <path
          stroke="#8a0b41"
          d="M23 8h1M23 9h2M17 10h1M22 10h1M24 10h1M17 11h2M18 12h1M18 13h1M25 13h1M18 14h1M25 14h1M18 15h1M25 15h1M17 16h3M24 16h1M17 17h4M24 17h1M26 17h1M17 18h3M23 18h1M25 18h1"
        ></path>
        <path
          stroke="#d77e4b"
          d="M23 10h1M19 11h6M21 12h1M24 12h1M20 13h3M24 13h1M19 14h1M24 15h1M23 16h1M21 18h1M21 19h2M13 20h1M20 20h2M32 20h1M14 21h1M20 21h1M31 21h2M14 22h1M30 22h2M13 23h3M17 47h1M25 47h1M16 48h2M25 48h1M16 49h1M24 49h2"
        ></path>
        <path stroke="#453c3c" d="M19 12h2M22 12h2M19 13h1M23 13h1"></path>
        <path
          stroke="#ffb164"
          d="M20 14h5M19 15h5M20 16h3M31 19h2M14 20h1M31 20h1M33 20h1M12 21h2M12 22h2"
        ></path>
        <path
          stroke="#793d4e"
          d="M21 17h3M22 18h1M16 47h1M18 47h1M24 47h1M18 48h1M24 48h1M17 49h1M16 50h1"
        ></path>
        <path
          stroke="#c0b10a"
          d="M20 18h1M19 19h1M23 19h2M18 20h1M22 20h3M18 21h1M22 21h2M17 22h2M21 22h3M17 23h7M17 24h3M21 24h3M17 25h3M21 25h2M24 27h1M24 28h1M25 29h1M25 30h2M25 31h2M25 32h2M25 33h2M25 34h3M25 35h3M25 36h3M25 37h4M25 38h4M25 39h4M25 40h4M15 41h1M24 41h5M14 42h4M23 42h6M14 43h4M23 43h6M14 44h9M24 44h4M15 45h7M24 45h4M16 46h5M24 46h3"
        ></path>
        <path
          stroke="#888c78"
          d="M20 19h1M25 19h1M19 20h1M25 20h2M17 21h1M19 21h1M21 21h1M25 21h2M19 22h2M25 22h1M30 23h1M20 24h1M23 25h1M23 28h1M21 29h4M20 30h5M18 31h1M20 31h5M17 32h8M17 33h8M17 34h8M16 35h9M15 36h10M15 37h10M14 38h11M15 39h10M17 40h8M18 41h6M19 42h4M19 43h4"
        ></path>
        <path
          stroke="#585651"
          d="M24 21h1M24 22h1M26 22h2M24 23h5M24 24h1M26 24h4M16 25h1M20 25h1M24 25h1M27 25h2M17 26h1M19 28h4M19 29h2M18 30h2M19 31h1M14 39h1M14 40h3M16 41h2M18 42h1M18 43h1"
        ></path>
        <path stroke="#dadfc3" d="M29 22h1M16 23h1M29 23h1M15 24h2"></path>
        <path
          stroke="#5b6731"
          d="M18 26h7M19 27h5M18 29h1M23 44h1M28 44h1M14 45h1M22 45h2M28 45h1M15 46h1M21 46h3M27 46h1"
        ></path>
        <path
          stroke="#331a19"
          d="M12 48h2M12 50h4M17 50h1M24 50h2M13 51h5M15 52h3M23 52h4"
        ></path>
        <path stroke="#5c3747" d="M12 49h1M14 49h2M26 50h1M23 51h1"></path>
        <path stroke="#79390a" d="M13 49h1M24 51h3"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="snap4"
      >
        <path
          stroke="#ce2038"
          d="M22 8h4M21 9h8M21 10h9M21 11h4M26 11h4M21 12h2M29 12h3M29 13h3M22 14h1M29 14h4M21 15h1M30 15h3M20 16h2M30 16h3M20 17h1M29 17h4M20 18h1M29 18h4M29 19h3M29 20h1"
        ></path>
        <path
          stroke="#8a0b41"
          d="M25 11h1M23 12h3M28 12h1M23 13h1M28 13h1M23 14h1M28 14h1M22 15h1M28 15h2M22 16h1M28 16h2M21 17h3M28 17h1M21 18h4M27 18h2M21 19h1"
        ></path>
        <path
          stroke="#d77e4b"
          d="M26 12h2M24 13h4M24 14h1M27 14h1M27 15h1M26 16h2M26 17h2M24 19h1M22 20h3M16 21h2M22 21h2M17 22h1M31 23h1M15 47h2M15 48h2M25 48h1M15 49h1M25 49h2"
        ></path>
        <path stroke="#453c3c" d="M25 14h2M26 15h1"></path>
        <path
          stroke="#ffb164"
          d="M23 15h3M23 16h3M24 17h2M16 19h2M16 20h2M30 20h2M30 21h2M31 22h1"
        ></path>
        <path stroke="#793d4e" d="M25 18h2M24 47h3M26 48h1M16 49h1"></path>
        <path
          stroke="#c0b10a"
          d="M22 19h2M26 19h1M20 20h2M25 20h1M19 21h3M24 21h2M19 22h2M22 22h3M19 23h2M22 23h3M22 24h3M25 27h1M25 28h1M25 29h2M25 30h2M25 31h2M24 32h4M24 33h4M24 34h4M24 35h4M24 36h4M23 37h4M23 38h4M13 39h2M22 39h5M13 40h3M22 40h5M13 41h3M21 41h6M11 42h6M20 42h7M11 43h16M12 44h7M20 44h7M14 45h5M21 45h6M16 46h3M22 46h5"
        ></path>
        <path
          stroke="#888c78"
          d="M25 19h1M27 19h2M19 20h1M26 20h3M26 21h3M21 22h1M25 22h1M27 22h2M25 23h1M19 24h2M22 29h2M21 30h4M19 31h6M16 32h8M14 33h10M12 34h12M11 35h13M14 36h10M15 37h8M15 38h8M16 39h6M16 40h6M17 41h4M17 42h3"
        ></path>
        <path
          stroke="#585651"
          d="M29 21h1M26 22h1M29 22h1M26 23h4M17 24h2M26 24h4M18 25h2M28 25h3M25 26h1M29 26h1M21 27h4M21 28h4M20 29h2M24 29h1M19 30h2M18 31h1M11 36h3M13 37h2M14 38h1M15 39h1M16 41h1"
        ></path>
        <path stroke="#dadfc3" d="M18 22h1M17 23h2M30 24h2"></path>
        <path
          stroke="#5b6731"
          d="M21 23h1M21 24h1M25 24h1M20 25h6M21 26h4M27 37h1M27 38h1M12 41h1M19 44h1M13 45h1M19 45h2M15 46h1M19 46h3"
        ></path>
        <path
          stroke="#331a19"
          d="M14 49h1M13 50h1M15 50h2M25 50h2M12 51h1M16 51h1M12 52h5M23 52h4"
        ></path>
        <path stroke="#5c3747" d="M14 50h1M15 51h1M23 51h1M26 51h1"></path>
        <path stroke="#79390a" d="M13 51h2M24 51h2"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="snap5"
      >
        <path
          stroke="#8a0b41"
          d="M24 10h1M27 13h1M26 14h2M28 15h1M28 16h2M28 17h2M28 18h3M23 19h1M27 19h4M23 20h1M27 20h1M33 21h1M31 23h1"
        ></path>
        <path
          stroke="#ce2038"
          d="M25 10h4M23 11h7M23 12h8M23 13h4M28 13h3M23 14h3M28 14h5M29 15h5M23 16h1M30 16h4M22 17h1M30 17h4M22 18h1M31 18h3M22 19h1M31 19h3M22 20h1M31 20h3M31 21h2M31 22h2"
        ></path>
        <path
          stroke="#d77e4b"
          d="M24 15h4M24 16h1M27 16h1M27 17h1M26 18h2M26 19h1M23 21h2M19 22h1M23 22h2M29 22h1M18 23h1M23 23h1M30 23h1M15 47h2M24 47h1M15 48h2M24 48h2M15 49h1M25 49h1"
        ></path>
        <path stroke="#453c3c" d="M25 16h2M26 17h1"></path>
        <path
          stroke="#ffb164"
          d="M23 17h3M23 18h3M24 19h2M18 20h2M29 20h2M18 21h2M29 21h2M18 22h1M30 22h1"
        ></path>
        <path stroke="#793d4e" d="M24 20h3M25 47h1M16 49h1M24 49h1"></path>
        <path
          stroke="#585651"
          d="M28 20h1M21 21h1M27 21h2M21 22h1M27 22h2M19 23h1M26 23h4M26 24h3M19 25h1M28 25h1M18 26h2M28 26h1M29 27h1M19 29h2M24 29h1M19 30h1M24 30h1M18 31h2M18 41h1M18 42h1M24 42h1M17 43h2M24 43h1M18 44h1"
        ></path>
        <path
          stroke="#c0b10a"
          d="M22 21h1M26 21h1M22 22h1M25 22h1M20 23h3M25 23h1M20 24h6M20 25h6M20 26h1M22 26h3M25 29h1M18 30h1M25 30h1M25 31h1M17 32h1M25 32h2M25 33h2M25 34h2M25 35h2M25 36h1M25 37h1M12 40h1M12 41h3M12 42h4M12 43h5M25 43h1M12 44h6M21 44h5M13 45h6M20 45h6M14 46h3M20 46h6"
        ></path>
        <path
          stroke="#888c78"
          d="M25 21h1M26 22h1M24 23h1M18 25h1M29 25h2M21 26h1M25 26h1M29 26h2M22 27h4M20 30h4M20 31h5M18 32h7M17 33h8M16 34h9M16 35h9M15 36h10M14 37h11M14 38h11M13 39h12M13 40h12M15 41h3M19 41h6M16 42h2M19 42h5M19 43h5M19 44h2"
        ></path>
        <path stroke="#dadfc3" d="M18 24h2M29 24h2"></path>
        <path
          stroke="#5b6731"
          d="M20 27h2M20 28h5M21 29h3M26 31h1M26 36h1M25 38h1M25 39h1M25 42h1M19 45h1M17 46h3"
        ></path>
        <path
          stroke="#331a19"
          d="M14 49h1M13 50h1M15 50h2M24 50h3M12 51h1M16 51h1M23 51h1M27 51h1M12 52h5M23 52h5"
        ></path>
        <path stroke="#5c3747" d="M14 50h1M15 51h1M24 51h1M26 51h1"></path>
        <path stroke="#79390a" d="M13 51h2M25 51h1"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="snap6"
      >
        <path
          stroke="#ce2038"
          d="M20 8h5M19 9h7M17 10h2M21 10h5M17 11h2M22 11h4M17 12h1M16 13h2M26 13h1M16 14h2M27 14h1M16 15h2M27 15h1M16 16h2M27 16h1M17 17h1M27 17h1M17 18h2M27 18h2M27 19h2M27 20h2"
        ></path>
        <path
          stroke="#8a0b41"
          d="M19 10h2M19 11h3M18 12h2M25 12h1M18 13h1M25 13h1M18 14h1M25 14h2M18 15h1M25 15h2M18 16h2M25 16h2M18 17h2M24 17h3M19 18h2M23 18h4"
        ></path>
        <path
          stroke="#d77e4b"
          d="M20 12h5M19 13h1M22 13h1M19 14h1M21 14h3M19 15h1M24 15h1M24 16h1M20 17h1M13 19h1M21 19h1M21 20h1M14 21h1M21 21h1M28 22h1M13 23h1M29 23h1M15 47h2M15 48h2M15 49h1"
        ></path>
        <path stroke="#453c3c" d="M20 13h2M23 13h2M20 14h1M24 14h1"></path>
        <path
          stroke="#ffb164"
          d="M20 15h4M20 16h4M21 17h3M13 20h2M29 20h1M13 21h1M28 21h2M13 22h1M29 22h1"
        ></path>
        <path
          stroke="#793d4e"
          d="M21 18h2M22 19h1M24 46h1M23 47h2M16 49h1"
        ></path>
        <path
          stroke="#888c78"
          d="M16 19h2M20 19h1M23 19h1M16 20h2M20 20h1M22 20h2M25 20h2M16 21h1M20 21h1M22 21h1M25 21h3M18 22h1M21 22h1M24 22h1M26 22h2M27 23h1M29 24h1M18 25h1M21 25h1M24 25h1M19 29h3M17 30h6M17 31h6M16 32h8M16 33h8M16 34h8M16 35h8M15 36h9M15 37h9M15 38h9M15 39h9M14 40h10M14 41h10M14 42h5M20 42h4M14 43h5M20 43h4M16 44h2M20 44h2"
        ></path>
        <path
          stroke="#585651"
          d="M18 19h1M25 19h2M18 20h1M17 21h2M14 22h4M25 22h1M15 23h3M25 23h2M28 23h1M15 24h3M26 24h2M14 25h2M27 25h3M28 26h1M18 27h4M18 28h5M17 29h2M22 29h1M19 42h1M19 43h1M18 44h2"
        ></path>
        <path
          stroke="#c0b10a"
          d="M19 19h1M24 19h1M19 20h1M24 20h1M19 21h1M23 21h2M19 22h2M22 22h2M18 23h7M18 24h7M19 25h2M22 25h2M22 27h2M23 28h1M16 29h1M23 29h2M16 30h1M23 30h2M15 31h2M23 31h2M15 32h1M24 32h1M14 33h2M24 33h2M14 34h2M24 34h2M14 35h2M24 35h2M13 36h2M24 36h2M13 37h2M24 37h2M13 38h2M24 38h2M13 39h2M24 39h3M13 40h1M24 40h3M12 41h2M24 41h3M12 42h2M24 42h3M12 43h2M24 43h3M13 44h3M22 44h4M13 45h12M14 46h7M22 46h2"
        ></path>
        <path stroke="#dadfc3" d="M14 23h1M13 24h2M28 24h1"></path>
        <path
          stroke="#5b6731"
          d="M17 25h1M18 26h5M17 27h1M17 28h1M21 46h1"
        ></path>
        <path
          stroke="#331a19"
          d="M25 47h1M23 48h4M23 49h3M27 49h1M13 50h2M16 50h1M24 50h1M12 51h1M15 51h2M25 51h3M12 52h5"
        ></path>
        <path
          stroke="#5c3747"
          d="M26 49h1M15 50h1M25 50h1M27 50h1M14 51h1"
        ></path>
        <path stroke="#79390a" d="M26 50h1M13 51h1"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="snap7"
      >
        <path
          stroke="#ce2038"
          d="M16 6h4M14 7h6M12 8h3M16 8h4M11 9h4M18 9h2M11 10h3M11 11h2M10 12h3M20 12h1M10 13h3M20 13h2M10 14h3M21 14h2M10 15h3M23 15h1M11 16h3M23 16h1M12 17h2M23 17h1M21 19h1"
        ></path>
        <path
          stroke="#8a0b41"
          d="M15 8h1M15 9h3M14 10h1M18 10h2M19 11h1M19 12h1M19 13h1M19 14h2M13 15h2M19 15h4M14 16h1M17 16h6M19 17h4M21 18h2"
        ></path>
        <path
          stroke="#d77e4b"
          d="M15 10h3M13 11h6M13 12h1M16 12h2M13 13h2M16 13h1M13 14h2M18 15h1M16 18h3M18 19h1M26 21h2M26 22h2M9 23h1M11 23h1M25 23h3M11 24h1M25 24h1M24 47h1M14 48h1M24 48h2M25 49h1"
        ></path>
        <path stroke="#453c3c" d="M14 12h2M18 12h1M15 13h1"></path>
        <path
          stroke="#ffb164"
          d="M17 13h2M15 14h4M15 15h3M26 20h1M28 21h1M8 22h1M28 22h1M7 23h2M10 23h1M8 24h3"
        ></path>
        <path
          stroke="#793d4e"
          d="M15 16h2M16 17h1M23 45h2M23 46h2M14 47h2M23 47h1M15 48h1M23 48h1M15 49h1M24 49h1"
        ></path>
        <path
          stroke="#585651"
          d="M14 17h1M13 18h2M13 19h2M13 20h1M13 21h1M20 21h1M13 22h1M20 22h2M13 23h2M20 23h2M20 24h4M11 25h2M21 25h4M25 37h2M24 38h3M24 39h2M20 40h1M24 40h1M20 41h3M18 42h4"
        ></path>
        <path
          stroke="#5b6731"
          d="M15 17h1M17 17h2M19 18h1M14 24h1M18 24h1M14 25h5M14 26h2M14 27h1M20 27h1M13 28h1M21 29h1M11 33h1M11 39h1M11 40h1M12 42h1M12 43h1M19 43h1M19 44h1M26 44h1M13 45h1M18 45h5M13 46h2M18 46h5"
        ></path>
        <path
          stroke="#888c78"
          d="M15 18h1M20 18h1M12 19h1M16 19h2M20 19h1M12 20h1M14 20h1M20 20h2M11 21h2M14 21h1M21 21h1M12 22h1M14 22h1M18 22h1M22 22h1M18 23h1M22 23h1M15 24h3M19 24h1M16 26h4M15 27h5M14 28h7M14 29h7M14 30h8M14 31h9M14 32h10M14 33h10M14 34h11M14 35h13M14 36h13M14 37h11M14 38h10M14 39h10M15 40h5M21 40h3M15 41h5M16 42h2"
        ></path>
        <path
          stroke="#c0b10a"
          d="M15 19h1M19 19h1M15 20h5M15 21h5M15 22h3M19 22h1M15 23h3M19 23h1M13 29h1M13 30h1M12 31h2M12 32h2M12 33h2M11 34h3M11 35h3M11 36h3M11 37h3M11 38h3M12 39h2M12 40h3M25 40h2M12 41h3M23 41h4M13 42h3M22 42h5M13 43h6M20 43h7M13 44h6M20 44h6M14 45h4M15 46h3"
        ></path>
        <path
          stroke="#dadfc3"
          d="M11 22h1M12 23h1M24 23h1M12 24h1M24 24h1"
        ></path>
        <path
          stroke="#331a19"
          d="M14 49h1M23 49h1M26 49h1M12 50h2M15 50h1M23 50h6M12 51h1M16 51h1M24 51h2M12 52h5M25 52h4"
        ></path>
        <path stroke="#5c3747" d="M14 50h1M26 51h1"></path>
        <path stroke="#79390a" d="M13 51h3M27 51h2"></path>
      </symbol>
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        viewBox="0 -0.5 39 53"
        id="snap8"
      >
        <path
          stroke="#ce2038"
          d="M16 9h3M14 10h6M14 11h6M13 12h7M13 13h2M11 15h2M20 15h1M10 16h3M20 16h1M10 17h3M20 17h2M10 18h4M21 18h2M10 19h4M20 19h3M10 20h3M14 20h2M20 20h2M11 21h2"
        ></path>
        <path
          stroke="#8a0b41"
          d="M15 13h5M12 14h4M19 14h1M13 15h2M19 15h1M13 16h2M13 17h2M14 18h2M19 18h2M14 19h2M18 19h2M19 20h1"
        ></path>
        <path
          stroke="#d77e4b"
          d="M16 14h3M15 15h1M18 15h1M15 16h1M15 17h1M8 20h1M16 20h2M17 21h2M22 21h1M23 22h1M8 23h2M23 23h1M9 24h2M26 46h1M25 47h2M25 48h2M15 49h1M25 49h1"
        ></path>
        <path stroke="#453c3c" d="M16 15h2M16 16h1"></path>
        <path
          stroke="#ffb164"
          d="M17 16h3M16 17h4M16 18h3M23 20h2M8 21h2M23 21h2M8 22h2M24 22h1"
        ></path>
        <path
          stroke="#793d4e"
          d="M16 19h2M25 44h2M25 45h2M25 46h1M16 47h2M15 48h3M16 49h1"
        ></path>
        <path
          stroke="#c0b10a"
          d="M13 20h1M18 20h1M14 21h2M19 21h1M15 22h7M16 23h6M16 24h4M21 24h1M16 25h4M17 26h2M21 29h1M16 31h1M15 32h2M15 33h2M15 34h2M15 35h2M16 36h1M28 38h2M17 39h1M28 39h3M16 40h2M27 40h4M16 41h2M27 41h4M15 42h4M26 42h5M15 43h4M25 43h2M30 43h1M15 44h10M16 45h6M16 46h5"
        ></path>
        <path
          stroke="#888c78"
          d="M13 21h1M16 21h1M12 22h2M12 23h2M15 23h1M12 24h1M15 24h1M20 24h1M12 25h1M21 25h1M23 25h1M16 26h1M20 29h1M18 30h5M18 31h6M17 32h11M17 33h13M17 34h14M17 35h14M17 36h11M30 36h1M18 37h9M19 38h7M19 39h7M19 40h7M20 41h6M20 42h6M19 43h6"
        ></path>
        <path
          stroke="#585651"
          d="M20 21h1M14 22h1M14 23h1M13 24h1M22 24h1M24 24h1M11 25h1M13 25h1M20 25h1M22 25h1M24 25h1M10 26h4M20 26h1M22 26h3M11 27h2M22 27h1M18 28h1M17 29h3M17 30h1M17 31h1M28 36h2M17 37h1M27 37h4M17 38h2M26 38h2M18 39h1M26 39h2M18 40h1M26 40h1M18 41h2M26 41h1M19 42h1"
        ></path>
        <path stroke="#dadfc3" d="M11 24h1M23 24h1M9 25h2"></path>
        <path
          stroke="#5b6731"
          d="M15 25h1M19 26h1M21 26h1M16 27h6M16 28h2M19 28h3M16 29h1M16 30h1M15 31h1M15 36h1M16 37h1M15 41h1M27 43h3M27 44h4M15 45h1M22 45h3M27 45h3M23 46h2M27 46h1"
        ></path>
        <path
          stroke="#331a19"
          d="M26 49h1M13 50h4M24 50h2M27 50h1M16 51h2M24 51h1M28 51h1M12 52h6M24 52h5"
        ></path>
        <path stroke="#5c3747" d="M26 50h1M12 51h1M15 51h1M25 51h1"></path>
        <path stroke="#79390a" d="M13 51h2M26 51h2"></path>
      </symbol>
    </svg>
  );
};
