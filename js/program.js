(function (global) {
  const EXERCISES = {
    'supino-reto': { id: 'supino-reto', name: 'Supino reto' },
    'voador-frente': { id: 'voador-frente', name: 'Voador frente' },
    'voador-costas': { id: 'voador-costas', name: 'Voador costas' },
    remada: { id: 'remada', name: 'Remada' },
    'barra-graviton': { id: 'barra-graviton', name: 'Barra Graviton' },
    'paralela-graviton': { id: 'paralela-graviton', name: 'Paralela Graviton' },
    'elevacao-ombro-maquina': { id: 'elevacao-ombro-maquina', name: 'Elevação de ombro máquina' },
    'biceps-scott': { id: 'biceps-scott', name: 'Bíceps Scott' },
    extensora: { id: 'extensora', name: 'Extensora' },
    panturrilha: { id: 'panturrilha', name: 'Panturrilha' },
    flexora: { id: 'flexora', name: 'Flexora' },
    abdutora: { id: 'abdutora', name: 'Abdutora' },
    adutora: { id: 'adutora', name: 'Adutora' },
  };

  const SERIES_A_IDS = [
    'supino-reto',
    'voador-frente',
    'voador-costas',
    'remada',
    'barra-graviton',
    'paralela-graviton',
    'elevacao-ombro-maquina',
    'biceps-scott',
    'extensora',
    'panturrilha',
  ];

  const SERIES_B_IDS = [
    'supino-reto',
    'voador-frente',
    'voador-costas',
    'remada',
    'barra-graviton',
    'paralela-graviton',
    'elevacao-ombro-maquina',
    'biceps-scott',
    'flexora',
    'abdutora',
    'adutora',
  ];

  function getExercises(series) {
    const ids = series === 'B' ? SERIES_B_IDS : SERIES_A_IDS;
    return ids.map((id) => EXERCISES[id]);
  }

  global.TreinoProgram = {
    getExercises,
    SET_COUNT: 3,
  };
})(window);
