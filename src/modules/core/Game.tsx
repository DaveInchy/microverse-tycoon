"use client";
import Body from "mods@core/systems/BodyTemplate";
import CameraController from "./Camera";
import Ceres from "mods@core/systems/Ceres";
import Earth from "mods@core/systems/Earth";
import Jupiter from "mods@core/systems/Jupiter";
import Mars from "mods@core/systems/Mars";
import Mercury from "mods@core/systems/Mercury";
import Moon from "mods@core/systems/Moon";
import Neptune from "mods@core/systems/Neptune";
import Saturn from "mods@core/systems/Saturn";
import Scene from "mods@components/Scene";
import Sun from "mods@core/systems/Sun";
import Uranus from "mods@core/systems/Uranus";
import Venus from "mods@core/systems/Venus";
import { OrbitControls, Stars } from "@react-three/drei";
import { MutableRefObject, Ref, Suspense, createRef, useEffect, useRef, useState } from "react";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Vector2, Vector3 } from "three";

export default function Core({ children, className, style }: { children?: React.ReactNode, className?: string | string[], style?: any, }) {

    /* A Game where you can buy universe in a box to power your other projects in a box
     * https://rickandmorty.fandom.com/wiki/Microverse_Battery
     * > This perhaps themed as an Rick and Morty fandom.
     * * * */

    return (<>
        <main style={style ? style : null} className={`${className?.toString()}` + " " + ""}>

            <Scene>
                <Suspense fallback={null}>

                    <CameraController/>

                    {/* scene */}
                    <Stars
                        fade={false}
                        saturation={1}
                        factor={8}
                        count={5000}
                        depth={50}
                        radius={5000} />
                    <pointLight
                        args={["#FFFFFF", 5, 750, 1.2]}
                        lookAt={(vector) => (new Vector3(0, 0, 0))}
                        position={[0, 0, 0]}
                        castShadow={true}
                    />
                    <ambientLight
                        intensity={0.1} />

                    {/* planets */}
                    <Sun forwardRef={target => target} hasRings={false} hasAtmosphere={false} location={new Vector3(0, 0, 0)} />
                    <Mercury location={new Vector3(75, 0, 0)} forwardRef={target => target} />
                    <Venus location={new Vector3(150, 0, 0)} forwardRef={target => target} />
                    <Earth forwardRef={target => target} hasRings={false} hasAtmosphere={true} location={new Vector3(225, 0, 0)} />
                    <Moon location={new Vector3(225, 0, 25)} forwardRef={target => target} />
                    <Ceres location={new Vector3(300, 0, 25)} forwardRef={target => target} />
                    <Mars location={new Vector3(300, 0, 0)} forwardRef={target => target} />
                    <Jupiter location={new Vector3(375, 0, 0)} forwardRef={target => target} />
                    <Saturn forwardRef={target => target} hasAtmosphere={false} hasRings={true} location={new Vector3(450, 0, 0)} />
                    <Neptune location={new Vector3(525, 0, 0)} forwardRef={target => target} />
                    <Uranus location={new Vector3(600, 0, 0)} forwardRef={target => target} />
                </Suspense>
            </Scene>

            <span className={"fixed bottom-0 mx-auto w-auto"}><h3>Author: github.com/daveinchy</h3></span>
        </main>
    </>) as JSX.Element;
}