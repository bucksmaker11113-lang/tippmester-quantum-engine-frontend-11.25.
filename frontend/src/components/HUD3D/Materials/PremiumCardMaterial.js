
import * as THREE from 'three';

export function createPremiumCardMaterial() {
  return new THREE.MeshPhysicalMaterial({
    roughness: 0.25,
    metalness: 0.15,
    clearcoat: 0.35,
    clearcoatRoughness: 0.1,
    transmission: 0.1,
    thickness: 0.4,
    color: new THREE.Color(0x0a1a2a),
  });
}
