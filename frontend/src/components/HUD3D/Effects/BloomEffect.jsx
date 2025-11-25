import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function BloomEffect() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.55}     // kisebb GPU terhelés
        luminanceThreshold={0.4}
        luminanceSmoothing={0.25}
        mipmapBlur={true}
      />
    </EffectComposer>
  );
}
