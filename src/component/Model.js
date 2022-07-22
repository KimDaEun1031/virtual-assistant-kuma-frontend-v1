import { useGLTF } from "@react-three/drei/core";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

useGLTF.preload("/models/Rigged_Bear.glb");

const Model = ({ ...props }) => {
  const group = useRef(null);
  const { animations, scene } = useGLTF("/models/Rigged_Bear.glb");

  let mixer = new THREE.AnimationMixer(scene);

  scene.scale.set(4, 4, 4);

  animations.forEach((clip) => {
    const action = mixer.clipAction(clip);
    action.play();
  });

  useFrame((state, delta) => {
    state.camera.position.set(0, 177.77578246511092, 888.8789123255547);
    mixer.update(delta);
  });

  return (
    <primitive ref={group} {...props} object={scene} dispose={null} />
  );
};

export default Model;
