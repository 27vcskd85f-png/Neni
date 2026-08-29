# Character assets

Everything in this folder is **optional**. The site probes for each file at
runtime and falls back to the fully procedural WebGL scene for anything that
is missing — so the repo builds and runs with this folder empty.

| File | Source | Used by |
|---|---|---|
| `character.glb` | Higgsfield A2 (`image_to_3d`, textured + PBR) | `src/three/Character.jsx` — replaces the procedural rig |
| `hero-poster.png` | Higgsfield A1 | Reduced-motion / no-WebGL hero, social card |
| `idle-loop.mp4` | Higgsfield A3 | Static hero fallback |
| `panel-burst.mp4` | Higgsfield A4 | Chapter-transition flash overlay |
| `logo-converge.mp4` | Higgsfield A5 | Closing CTA convergence |

## Getting them

    bash scripts/fetch-assets.sh

That script holds the Higgsfield CDN links for the generated set. Re-running it
overwrites whatever is here.

## Swapping the character

Drop a different `character.glb` in. `Character.jsx` normalises any mesh to the
rig automatically: it is scaled to 1.8 world units tall, centred on X/Z and sat
on the ground plane, so proportions and export scale from the generator do not
matter. Emitter points for the particle system are defined in `EMITTERS` in the
same file — nudge those if the new mesh has its shoulders somewhere else.
