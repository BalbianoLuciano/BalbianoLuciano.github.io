import React, { useEffect, useState } from 'react';
import RadialOverlay from './utils/RadialOverlay.jsx';
import ProjectDetail from './utils/ProjectDetail.jsx';
import data from '../data/projects.json';

/**
 * Detalle de proyecto a nivel viewport.
 *
 * Vive aca y no dentro de Projects.jsx por la Ley 3 de la spec 001: Projects se
 * renderiza dentro del `.container` que ScrollTrigger pinea con un `transform`,
 * y un `position: fixed` ahi adentro se ancla al ancestro transformado, no al
 * viewport. El overlay quedaba recortado a la caja de la seccion.
 *
 * Projects avisa por evento:
 *   window.dispatchEvent(new CustomEvent('project:open', {
 *     detail: { id, x, y }
 *   }))
 */
const ProjectOverlay = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    const onOpen = (event) => {
      const { id, x, y } = event.detail ?? {};
      const project = data.projects.find((p) => p.id === id);
      if (!project) return;

      setState({
        project,
        origin: {
          x: typeof x === 'number' ? x : window.innerWidth / 2,
          y: typeof y === 'number' ? y : window.innerHeight / 2,
        },
      });
    };

    window.addEventListener('project:open', onOpen);
    return () => window.removeEventListener('project:open', onOpen);
  }, []);

  if (!state) return null;

  return (
    <RadialOverlay
      origin={state.origin}
      onClose={() => setState(null)}
      label={state.project.name}
    >
      <ProjectDetail project={state.project} />
    </RadialOverlay>
  );
};

export default ProjectOverlay;
