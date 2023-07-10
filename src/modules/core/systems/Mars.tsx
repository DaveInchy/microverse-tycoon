import ambient from "mods@shaders/textures/mars_ambient.jpg";
import clouds from "mods@shaders/textures/clouds_atmosphere_colormap.jpg";
import color from "mods@shaders/textures/mars_colormap.jpg";
import depth from "mods@shaders/textures/mars_displacement.jpg";
import normal from "mods@shaders/textures/mars_normal.jpg";
import specular from "mods@shaders/textures/mars_specular.jpg";
import { wait } from "mods@utils/wait";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { DoubleSide, Texture, Vector3 } from "three";
import { useTextureMap } from "./useTextureMap";

export default function Mars({
    location = new Vector3(0, 0, 0),
    forwardRef,
}: {
    location?: Vector3,
    forwardRef: (target: MutableRefObject<any>) => void,
}): JSX.Element {

    // Load Textures
    const [T_COLOR, T_NORMAL, T_AMBIENT, T_SPECULAR, T_DEPTH, T_CLOUDS]: (Texture | undefined | null)[] = useTextureMap([color.src, normal.src, ambient.src, specular.src, depth.src, clouds.src]) as (Texture | undefined | null)[]

    // Weather 'n Clouds movement.
    const [offSet, setOffSet] = useState(0);
    const [delta, setDelta] = useState(0.00005);

    // Group of Meshes passback to parent.
    const planetRef = useRef(undefined as unknown as any);

    // Component Modifiers.
    useEffect(() => {
        wait(1).then(async () => {
            if (offSet >= 0 && offSet < 2) {
                setOffSet(offSet + delta);
            } else {
                setOffSet(0);
            }
        })
    }, [delta, offSet]);

    // Reference detected.
    useEffect(() => {
        forwardRef(planetRef)
    }, [forwardRef, planetRef])

    // Render Geometry Component.
    return (
        <group ref={planetRef}>
            {/* Clouds & Atmosphere */}
            {/* <mesh position={location}>
                <sphereGeometry
                    args={[10.1, 32, 16, Math.PI * (offSet * 1.5), Math.PI * 2, 0, Math.PI * 1]} />
                <meshPhongMaterial
                    map={T_CLOUDS}
                    opacity={0.2}
                    transparent={true}
                    side={DoubleSide} />
            </mesh> */}
            {/* Surface & Water */}
            <mesh position={location}>
                <sphereGeometry
                    args={[10, 32, 16, Math.PI * offSet, Math.PI * 2, 0, Math.PI * 1]}
                    onUpdate={geometry => {
                        geometry.center()
                        geometry.rotateY(Math.PI / 2)
                    }} />
                <meshPhongMaterial
                    specularMap={T_SPECULAR}
                    displacementMap={T_DEPTH}
                    aoMap={T_AMBIENT}
                    aoMapIntensity={1.5}
                    depthWrite={true} />
                <meshStandardMaterial
                    map={T_COLOR}
                    normalMap={T_NORMAL}
                    roughness={1}
                    metalness={0} />
            </mesh>

        </group>
    )
}