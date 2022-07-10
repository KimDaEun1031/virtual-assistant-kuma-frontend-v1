import { useGLTF } from "@react-three/drei/core";
import React, { useRef } from "react";

useGLTF.preload("/models/Rigged_Bear.gltf");

const Model = ({ ...props }) => {
  const group = useRef(null);
  const { nodes, materials } = useGLTF("/models/Rigged_Bear.gltf");

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        rotation={[300, 0, 0]}
        geometry={nodes.Rigged_Bear.geometry}
        material={materials.RiggedBear}
      />
    </group>
  );
};

export default Model;
