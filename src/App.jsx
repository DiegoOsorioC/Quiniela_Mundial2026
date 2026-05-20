import React, { useState } from "react";

function MundialDraftApp() {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [assignments, setAssignments] = useState([]);

  // Grupos oficiales del Mundial FIFA 2026.
  // Basados en el sorteo oficial realizado en diciembre de 2025.
  const teams = [
    { name: "México", flag: "🇲🇽", group: "A" },
    { name: "Sudáfrica", flag: "🇿🇦", group: "A" },
    { name: "Corea del Sur", flag: "🇰🇷", group: "A" },
    { name: "República Checa", flag: "🇨🇿", group: "A" },

    { name: "Canadá", flag: "🇨🇦", group: "B" },
    { name: "Bosnia y Herzegovina", flag: "🇧🇦", group: "B" },
    { name: "Qatar", flag: "🇶🇦", group: "B" },
    { name: "Suiza", flag: "🇨🇭", group: "B" },

    { name: "Brasil", flag: "🇧🇷", group: "C" },
    { name: "Marruecos", flag: "🇲🇦", group: "C" },
    { name: "Haití", flag: "🇭🇹", group: "C" },
    { name: "Escocia", flag: "🏴", group: "C" },

    { name: "Estados Unidos", flag: "🇺🇸", group: "D" },
    { name: "Paraguay", flag: "🇵🇾", group: "D" },
    { name: "Australia", flag: "🇦🇺", group: "D" },
    { name: "Turquía", flag: "🇹🇷", group: "D" },

    { name: "Alemania", flag: "🇩🇪", group: "E" },
    { name: "Curazao", flag: "🇨🇼", group: "E" },
    { name: "Costa de Marfil", flag: "🇨🇮", group: "E" },
    { name: "Ecuador", flag: "🇪🇨", group: "E" },

    { name: "Países Bajos", flag: "🇳🇱", group: "F" },
    { name: "Japón", flag: "🇯🇵", group: "F" },
    { name: "Suecia", flag: "🇸🇪", group: "F" },
    { name: "Túnez", flag: "🇹🇳", group: "F" },

    { name: "Bélgica", flag: "🇧🇪", group: "G" },
    { name: "Egipto", flag: "🇪🇬", group: "G" },
    { name: "Irán", flag: "🇮🇷", group: "G" },
    { name: "Nueva Zelanda", flag: "🇳🇿", group: "G" },

    { name: "España", flag: "🇪🇸", group: "H" },
    { name: "Cabo Verde", flag: "🇨🇻", group: "H" },
    { name: "Arabia Saudita", flag: "🇸🇦", group: "H" },
    { name: "Uruguay", flag: "🇺🇾", group: "H" },

    { name: "Francia", flag: "🇫🇷", group: "I" },
    { name: "Senegal", flag: "🇸🇳", group: "I" },
    { name: "Irak", flag: "🇮🇶", group: "I" },
    { name: "Noruega", flag: "🇳🇴", group: "I" },

    { name: "Argentina", flag: "🇦🇷", group: "J" },
    { name: "Argelia", flag: "🇩🇿", group: "J" },
    { name: "Austria", flag: "🇦🇹", group: "J" },
    { name: "Jordania", flag: "🇯🇴", group: "J" },

    { name: "Portugal", flag: "🇵🇹", group: "K" },
    { name: "RD Congo", flag: "🇨🇩", group: "K" },
    { name: "Uzbekistán", flag: "🇺🇿", group: "K" },
    { name: "Colombia", flag: "🇨🇴", group: "K" },

    { name: "Inglaterra", flag: "🏴", group: "L" },
    { name: "Croacia", flag: "🇭🇷", group: "L" },
    { name: "Ghana", flag: "🇬🇭", group: "L" },
    { name: "Panamá", flag: "🇵🇦", group: "L" },
  ];

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function assignTeams() {
    if (people.length === 0) {
      setAssignments([]);
      return;
    }
    const shuffledTeams = [...teams].sort(
      () => Math.random() - 0.5
    );

    // Cantidad EXACTA para cada participante
    const teamsPerPerson = Math.floor(
      teams.length / people.length
    );

    // Máximo total que se puede asignar
    const maxAssigned =
      teamsPerPerson * people.length;

    const assignments = people.map((person) => ({
      person,
      teams: [],
      groups: new Set(),
    }));

    const unassigned = [];

    shuffledTeams.forEach((team) => {
      // Total actualmente asignado
      const currentAssigned = assignments.reduce(
        (acc, curr) => acc + curr.teams.length,
        0
      );

      // Si ya se alcanzó el límite
      if (currentAssigned >= maxAssigned) {
        unassigned.push(team);
        return;
      }

      // Participantes con espacio disponible
      let candidates = assignments.filter(
        (a) => a.teams.length < teamsPerPerson
      );

      // Intentar evitar grupos repetidos
      let selected = candidates.find(
        (a) => !a.groups.has(team.group)
      );

      // Si no existe uno ideal, usar cualquiera disponible
      if (!selected && candidates.length > 0) {
        selected = candidates[0];
      }

      if (selected) {
        selected.teams.push(team);
        selected.groups.add(team.group);
      } else {
        unassigned.push(team);
      }
    });

    // Agregar sección sobrante
    setAssignments([
      ...assignments,
      {
        person: "Sin asignar",
        teams: unassigned,
        unassigned: true,
      },
    ]);
  }

  function addPerson() {
    if (!newPerson.trim()) return;

    if (people.includes(newPerson.trim())) return;

    setPeople([...people, newPerson.trim()]);
    setNewPerson("");
  }

  function removePerson(person) {
    setPeople(people.filter((p) => p !== person));
  }

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <input
              type="text"
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
              placeholder="Agregar participante"
              className="flex-1 border border-zinc-300 rounded-2xl px-4 py-3 text-lg"
            />

            <button
              onClick={addPerson}
              className="bg-black text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90"
            >
              Agregar
            </button>

            <button
              onClick={assignTeams}
              disabled={people.length === 0}
              className="bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50"
            >
              Generar Sorteo
            </button>
          </div>

          {people.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {people.map((person) => (
                <div
                  key={person}
                  className="flex items-center gap-2 bg-zinc-200 px-4 py-2 rounded-full"
                >
                  <span>{person}</span>
                  <button
                    onClick={() => removePerson(person)}
                    className="text-red-600 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <h1 className="text-4xl font-bold text-center mb-3">
            Mundial 2026 - Sorteo de Selecciones
          </h1>
          <p className="text-center text-zinc-600 text-lg">
            Distribución equilibrada y evitando repetir grupos por persona.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assignments.map((entry) => (
            <div
              key={entry.person}
              className={`rounded-3xl shadow-2xl p-6 border ${entry.unassigned
                ? "bg-red-100 border-red-400"
                : "bg-zinc-100 border-zinc-300"
                }`}
            >
              <div
                className={`flex items-center justify-between mb-5 px-4 py-3 rounded-2xl ${entry.unassigned
                  ? "bg-red-200"
                  : "bg-zinc-800"
                  }`}
              >
                <h2
                  className={`text-2xl font-black tracking-wide ${entry.unassigned
                    ? "text-red-900"
                    : "text-white"
                    }`}
                >
                  {entry.person}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${entry.unassigned
                      ? "bg-red-700 text-white"
                      : "bg-white text-zinc-900"
                    }`}
                >
                  {entry.teams.length} selecciones
                </span>
              </div>

              <div className="space-y-3">
                {entry.teams.map((team) => (
                  <div
                    key={team.name}
                    className="flex items-center justify-between bg-zinc-100 rounded-2xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${Array.from(team.flag)
                          .map((char) => char.codePointAt(0).toString(16))
                          .join("-")}.png`}
                        alt={team.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">{team.name}</span>
                    </div>
                    <span className="text-sm bg-zinc-800 text-white px-2 py-1 rounded-full">
                      Grupo {team.group}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-3xl shadow-lg p-6 text-zinc-700">
          <h3 className="text-xl font-bold mb-3">Reglas aplicadas</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Todas las personas reciben prácticamente la misma cantidad de selecciones.</li>
            <li>Se intenta evitar que una persona tenga selecciones del mismo grupo.</li>
            <li>Después de cumplir las reglas principales, las asignaciones son aleatorias.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MundialDraftApp;
