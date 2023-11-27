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
        <path stroke={controls.color11} d="M11 51h2M25 51h2" />
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
        />
        <path
          stroke={controls.color2}
          d="M24 8h1M17 9h1M17 10h1M23 10h1M25 10h1M24 11h1M17 12h2M24 12h1M17 13h1M24 13h1M17 14h1M24 14h2M16 15h2M24 15h2M16 16h2M24 16h1M26 16h1M17 17h1M24 17h1M27 20h1M27 21h1M26 22h1"
        />
        <path
          stroke={controls.color3}
          d="M13 14h2M13 15h2M13 16h1M23 17h1M17 18h1M19 18h1M23 18h1M25 18h1M17 19h1M25 19h1M17 20h1M22 20h1M25 20h1M21 21h1M21 23h1M18 27h2M18 28h5M17 29h6M16 30h7M15 31h9M13 32h11M12 33h12M9 34h14M9 35h14M9 36h14M9 37h13M10 38h12M13 39h9M13 40h7M13 41h7M14 42h5M16 43h2"
        />
        <path
          stroke={controls.color4}
          d="M27 14h2M27 15h2M14 16h1M27 16h2M13 17h3M26 17h3M13 18h4M26 18h3M14 19h3M26 19h2M15 20h2M26 20h1M16 21h1M26 21h1M18 26h1M17 27h1M20 27h5M16 28h2M23 28h2M15 29h2M23 29h2M15 30h1M23 30h1M14 31h1M11 39h2M12 40h1"
        />
        <path stroke={controls.color5} d="M18 15h2M22 15h2" />
        <path
          stroke={controls.color6}
          d="M20 15h2M18 16h6M19 17h4M20 19h3M20 20h2"
        />
        <path
          stroke={controls.color7}
          d="M18 17h1M20 18h3M13 46h3M24 46h3M12 47h3M25 47h2M12 48h2M25 48h2M13 49h1M13 51h1M27 51h1"
        />
        <path
          stroke={controls.color8}
          d="M18 18h1M24 18h1M18 19h2M23 19h2M18 20h2M23 20h2M17 21h4M22 21h4M17 22h9M17 23h4M22 23h4M17 24h4M22 24h3M25 26h1M25 27h1M25 28h2M25 29h2M24 30h3M24 31h3M24 32h4M24 33h4M23 34h5M23 35h5M23 36h5M22 37h6M22 38h5M22 39h5M11 40h1M20 40h7M11 41h2M20 41h7M10 42h4M19 42h8M10 43h6M18 43h9M12 44h15M13 45h14M17 46h7"
        />
        <path stroke={controls.color9} d="M21 24h1M25 24h1M18 25h8M19 26h6" />
        <path
          stroke={controls.color10}
          d="M11 49h2M25 49h2M11 50h3M24 50h4M10 51h1M24 51h1M10 52h4M24 52h4"
        />
        <path stroke={controls.color11} d="M11 51h2M25 51h2" />
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
        />
        <path
          stroke={controls.color2}
          d="M20 10h2M19 11h3M25 11h2M19 12h1M18 13h2M18 14h1M18 15h1M18 16h2M25 16h1M18 17h2M25 17h1M19 18h2M23 18h3M16 22h1M17 23h1"
        />
        <path
          stroke={controls.color3}
          d="M14 13h1M14 14h1M27 14h1M26 15h3M26 16h3M12 17h2M15 17h1M26 17h3M13 18h4M26 18h2M13 19h5M25 19h3M15 20h3M26 20h1M15 21h3M17 22h1M22 27h3M19 28h2M19 29h1"
        />
        <path
          stroke={controls.color4}
          d="M13 14h1M13 15h2M12 16h3M14 17h1M17 18h2M18 19h1M20 19h1M23 19h1M18 20h1M20 20h1M23 20h1M22 21h1M18 24h1M22 24h1M25 27h1M21 28h6M20 29h7M19 30h9M19 31h9M19 32h10M19 33h11M18 34h13M18 35h13M18 36h13M17 37h15M17 38h15M17 39h15M17 40h14M17 41h14M17 42h13"
        />
        <path
          stroke={controls.color5}
          d="M19 14h2M19 15h1M22 15h1M20 16h5M20 17h5M21 19h2M21 20h2M14 44h1M14 45h1M13 46h2M13 47h1"
        />
        <path stroke={controls.color6} d="M20 15h2" />
        <path
          stroke={controls.color7}
          d="M21 18h2M15 44h2M15 45h2M15 46h1M26 46h2M14 47h1M26 47h2M13 48h2M26 48h2M14 49h1M27 49h1M10 51h1M12 51h1"
        />
        <path
          stroke={controls.color8}
          d="M19 19h1M24 19h1M19 20h1M24 20h2M18 21h4M23 21h4M18 22h9M18 23h8M19 24h3M23 24h3M26 26h1M26 27h1M27 28h1M27 29h2M18 30h1M28 30h1M18 31h1M28 31h1M18 32h1M17 33h2M17 34h1M17 35h1M16 36h2M14 37h3M13 38h4M11 39h6M11 40h6M11 41h6M13 42h4M15 43h15M17 44h13M19 45h10"
        />
        <path stroke={controls.color9} d="M18 25h9M19 26h7M19 27h3" />
        <path
          stroke={controls.color10}
          d="M12 49h2M25 49h2M11 50h4M25 50h3M13 51h2M24 51h1M27 51h2M10 52h5M24 52h5"
        />
        <path stroke={controls.color11} d="M11 51h1M25 51h2" />
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
        />
        <path
          stroke="#8a0b41"
          d="M20 11h2M19 12h2M19 13h2M19 15h1M18 16h2M18 17h2M15 21h1M15 22h2M15 23h3M16 24h3M16 25h3"
        />
        <path
          stroke="#585651"
          d="M15 14h1M26 15h2M15 16h1M25 16h3M12 17h2M15 17h2M25 17h3M12 18h2M15 18h3M25 18h2M13 19h5M26 19h1M14 20h4M16 21h3M17 22h2M18 23h1M29 39h4M29 40h2"
        />
        <path
          stroke="#d77e4b"
          d="M20 14h2M20 15h1M20 16h5M21 17h4M19 18h1M21 19h3M22 20h2M14 46h1M14 47h1"
        />
        <path
          stroke="#888c78"
          d="M14 15h2M13 16h2M14 17h1M14 18h1M23 18h1M18 19h1M20 19h1M24 19h1M18 20h1M21 20h1M24 20h1M19 23h1M24 23h1M19 24h1M24 24h1M24 27h2M22 28h5M20 29h8M20 30h9M20 31h11M20 32h14M20 33h16M20 34h16M20 35h16M20 36h15M21 37h14M21 38h13M22 39h7M23 40h6M24 41h4M25 42h2"
        />
        <path stroke="#453c3c" d="M21 15h2" />
        <path
          stroke="#793d4e"
          d="M20 17h1M20 18h3M15 45h2M15 46h2M27 46h2M15 47h1M27 47h2M13 48h3M27 48h2M14 49h1M28 49h1M13 51h1M27 51h1"
        />
        <path
          stroke="#c0b10a"
          d="M18 18h1M24 18h1M19 19h1M25 19h1M19 20h2M25 20h2M19 21h8M19 22h8M20 23h4M25 23h2M20 24h4M25 24h2M26 26h1M26 27h2M27 28h2M19 29h1M28 29h1M19 30h1M29 30h1M18 31h2M18 32h2M18 33h2M18 34h2M17 35h3M17 36h3M17 37h4M16 38h5M15 39h7M33 39h1M15 40h8M31 40h3M15 41h9M28 41h5M15 42h10M27 42h6M15 43h17M15 44h16M17 45h12"
        />
        <path stroke="#5b6731" d="M19 25h7M19 26h7M19 27h5M19 28h3" />
        <path
          stroke="#331a19"
          d="M12 49h2M25 49h3M11 50h4M25 50h4M10 51h1M14 51h1M24 51h1M28 51h1M10 52h4M24 52h5"
        />
        <path stroke="#79390a" d="M11 51h2M25 51h2" />
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
        />
        <path
          stroke={controls.color2}
          d="M18 11h2M26 11h1M18 12h1M25 12h2M18 13h1M26 13h1M18 14h1M17 15h2M25 15h1M17 16h2M24 16h2M16 17h4M24 17h1M17 18h1M14 21h1M14 22h2M14 23h2M14 24h3M16 25h2"
        />
        <path
          stroke={controls.color3}
          d="M14 14h1M12 15h3M13 16h2M14 17h1M16 18h1M22 18h1M19 19h1M22 19h1M24 19h1M20 20h1M22 20h1M22 23h1M25 23h1M25 26h3M23 27h7M23 28h9M23 29h11M24 30h11M25 31h11M26 32h11M26 33h11M26 34h11M26 35h11M26 36h11M26 37h10M27 38h6M34 38h1M27 39h4M27 40h3"
        />
        <path
          stroke="#585651"
          d="M15 14h1M15 15h1M27 15h1M12 16h1M15 16h1M27 16h2M12 17h2M15 17h1M26 17h3M12 18h4M25 18h3M13 19h5M25 19h3M13 20h5M15 21h2M16 22h1M16 23h1M24 25h2M21 26h4M19 27h4M22 28h1M23 30h1M24 31h1M25 32h1M25 33h1M26 38h1M33 38h1M26 39h1M31 39h1M26 40h1"
        />
        <path
          stroke="#d77e4b"
          d="M19 14h2M19 15h1M19 16h5M20 17h4M20 19h2M21 20h1M15 45h1M14 46h2M28 46h1M14 47h1M28 47h1"
        />
        <path stroke="#453c3c" d="M20 15h2" />
        <path
          stroke="#c0b10a"
          d="M18 18h1M23 18h1M18 19h1M23 19h1M18 20h2M23 20h3M18 21h8M17 22h9M17 23h5M23 23h2M18 24h3M19 28h3M19 29h4M19 30h4M19 31h5M19 32h6M18 33h7M17 34h9M17 35h9M17 36h9M16 37h10M16 38h10M16 39h10M32 39h3M15 40h11M30 40h5M15 41h19M15 42h18M15 43h17M17 44h13M19 45h9"
        />
        <path
          stroke="#793d4e"
          d="M19 18h3M15 44h2M16 45h1M28 45h1M16 46h1M27 46h1M15 47h1M27 47h1M13 48h2M27 48h2M14 49h1M28 49h1M11 51h1M14 51h1M25 51h1"
        />
        <path
          stroke="#5b6731"
          d="M17 21h1M17 24h1M21 24h4M18 25h6M18 26h3M18 27h1"
        />
        <path
          stroke="#331a19"
          d="M12 49h2M25 49h3M12 50h3M25 50h4M10 51h1M24 51h1M28 51h2M10 52h5M24 52h6"
        />
        <path stroke="#79390a" d="M12 51h2M26 51h2" />
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
        />
        <path
          stroke={controls.color2}
          d="M13 10h1M15 12h1M21 12h1M14 13h1M22 13h1M13 14h2M22 14h1M13 15h2M21 15h2M12 16h1M14 16h1M21 16h2M14 17h1M21 17h1"
        />
        <path
          stroke="#585651"
          d="M10 14h2M10 15h2M10 16h2M24 16h1M10 17h3M23 17h3M10 18h3M22 18h4M11 19h2M22 19h3M12 20h1M22 20h2M22 21h1M20 26h1M14 27h7M14 28h1M24 31h1M23 32h3M14 34h1M28 36h2M15 37h1M27 37h2M28 38h1M16 40h1"
        />
        <path
          stroke={controls.color3}
          d="M24 14h2M24 15h2M25 16h1M15 17h1M13 18h1M15 18h1M19 18h1M21 18h1M13 19h1M21 19h1M13 20h1M16 20h1M21 20h1M17 21h1M17 23h1M15 28h7M14 29h9M14 30h10M14 31h10M14 32h9M14 33h14M15 34h16M15 35h16M15 36h13M16 37h11M16 38h12M16 39h12M17 40h11M17 41h10M18 42h8M21 43h2"
        />
        <path stroke="#453c3c" d="M15 15h2M19 15h2" />
        <path stroke="#d77e4b" d="M17 15h2M15 16h6M16 17h4M16 19h3M17 20h2" />
        <path
          stroke="#793d4e"
          d="M20 17h1M16 18h3M12 46h3M24 46h2M12 47h3M24 47h3M12 48h2M25 48h2M25 49h1M11 51h1M25 51h1"
        />
        <path
          stroke="#c0b10a"
          d="M14 18h1M20 18h1M14 19h2M19 19h2M14 20h2M19 20h2M13 21h4M18 21h4M13 22h9M13 23h4M18 23h4M14 24h3M18 24h4M13 26h1M13 27h1M21 27h1M12 28h2M12 29h2M12 30h2M12 31h2M11 32h3M11 33h3M11 34h3M11 35h4M11 36h4M11 37h4M12 38h4M29 38h1M12 39h4M28 39h2M12 40h4M28 40h2M12 41h5M27 41h3M12 42h6M26 42h3M12 43h9M23 43h5M12 44h15M12 45h14"
        />
        <path stroke="#5b6731" d="M13 24h1M17 24h1M13 25h8M14 26h6" />
        <path
          stroke="#331a19"
          d="M12 49h2M26 49h2M11 50h4M25 50h3M14 51h1M28 51h1M11 52h4M25 52h4"
        />
        <path stroke="#79390a" d="M12 51h2M26 51h2" />
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
        />
        <path
          stroke={controls.color2}
          d="M16 10h1M10 11h1M16 11h2M17 12h1M17 13h2M18 14h1M10 15h1M18 15h1M11 16h1M17 16h2M11 17h1M17 17h2M12 18h2M16 18h2M20 22h1M19 23h2M19 24h1"
        />
        <path
          stroke="#585651"
          d="M22 13h1M9 14h1M22 14h1M8 15h2M8 16h3M8 17h3M21 17h1M23 17h2M9 18h2M20 18h4M9 19h3M19 19h5M10 20h1M19 20h3M19 21h3M19 22h1M11 26h1M11 27h1M15 28h3M10 29h1M10 30h1M16 40h1M16 41h2M16 42h2M16 43h1"
        />
        <path
          stroke="#d77e4b"
          d="M16 14h2M14 15h1M17 15h1M12 16h5M12 17h5M14 19h2M14 20h2M24 45h1M24 46h2M25 47h1"
        />
        <path
          stroke={controls.color3}
          d="M23 14h1M22 15h2M22 16h3M22 17h1M18 18h2M13 19h1M16 19h1M18 19h1M13 20h1M16 20h1M18 20h1M14 21h1M14 24h1M18 24h1M12 27h1M11 28h4M11 29h7M11 30h7M10 31h8M10 32h9M9 33h10M9 34h11M9 35h12M9 36h12M9 37h13M9 38h13M9 39h14M9 40h7M17 40h6M9 41h7M18 41h3M9 42h7M9 43h7"
        />
        <path stroke="#453c3c" d="M15 15h2" />
        <path
          stroke="#793d4e"
          d="M14 18h2M23 45h1M23 46h1M11 47h2M24 47h1M11 48h2M24 48h2M11 49h1M24 49h1M25 51h1"
        />
        <path
          stroke="#c0b10a"
          d="M12 19h1M17 19h1M11 20h2M17 20h1M10 21h4M15 21h4M10 22h9M11 23h8M11 24h3M15 24h3M10 26h1M10 27h1M18 27h1M18 28h2M18 29h2M18 30h3M18 31h3M19 32h2M19 33h3M20 34h2M21 35h1M21 36h2M22 37h2M22 38h3M23 39h3M23 40h4M21 41h6M18 42h9M17 43h10M10 44h16M10 45h13M11 46h8"
        />
        <path stroke="#5b6731" d="M10 25h9M12 26h6M13 27h5" />
        <path
          stroke="#331a19"
          d="M12 49h2M25 49h2M11 50h3M24 50h4M10 51h2M14 51h1M24 51h1M28 51h1M10 52h5M24 52h5"
        />
        <path stroke="#79390a" d="M12 51h2M26 51h2" />
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
        />
        <path
          stroke={controls.color2}
          d="M16 10h3M17 11h1M17 12h2M16 13h3M19 15h1M19 16h2M19 17h2M22 22h2M21 23h2M20 24h3"
        />
        <path
          stroke="#d77e4b"
          d="M16 14h3M18 15h1M14 16h5M14 17h4M19 18h1M15 19h3M15 20h2"
        />
        <path
          stroke="#585651"
          d="M23 14h1M11 16h3M23 16h1M11 17h3M22 17h2M25 17h2M12 18h2M21 18h3M25 18h2M12 19h1M21 19h5M21 20h4M20 21h3M20 22h2M20 23h1M13 26h3M12 27h8M16 28h4M18 33h1M17 37h1M17 38h1M6 39h3M17 39h1M7 40h1M16 40h1M14 41h1M11 42h2"
        />
        <path
          stroke="#793d4e"
          d="M15 15h1M18 17h1M16 18h3M23 43h1M22 44h2M21 45h3M10 46h2M22 46h3M10 47h2M23 47h2M10 48h2M24 48h2M10 49h1M24 49h1M11 51h1M25 51h1M28 51h1"
        />
        <path stroke="#453c3c" d="M16 15h2" />
        <path
          stroke={controls.color3}
          d="M23 15h2M24 16h2M24 17h1M15 18h1M24 18h1M14 19h1M18 19h1M20 19h1M14 20h1M17 20h1M20 20h1M14 23h1M19 23h1M14 24h1M19 24h1M11 28h5M10 29h9M9 30h10M8 31h11M7 32h12M6 33h12M5 34h13M4 35h14M4 36h14M4 37h13M5 38h12M9 39h8M8 40h8M9 41h5M13 42h1"
        />
        <path
          stroke="#c0b10a"
          d="M14 18h1M20 18h1M13 19h1M19 19h1M12 20h2M18 20h2M12 21h8M12 22h8M12 23h2M15 23h4M12 24h2M15 24h4M12 26h1M11 27h1M10 28h1M19 29h1M19 30h1M19 31h2M19 32h2M19 33h2M18 34h3M18 35h4M18 36h4M18 37h4M18 38h5M18 39h5M6 40h1M17 40h7M6 41h3M15 41h9M6 42h5M14 42h10M7 43h16M8 44h14M10 45h10"
        />
        <path stroke="#5b6731" d="M13 25h7M16 26h4" />
        <path
          stroke="#331a19"
          d="M11 49h2M25 49h2M10 50h4M24 50h4M10 51h1M14 51h1M24 51h1M10 52h5M24 52h5"
        />
        <path stroke="#79390a" d="M12 51h2M26 51h2" />
      </symbol>
    </svg>
  );
};
