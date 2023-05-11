const heroeTeamColorSchema = {
    type: "object",
    properties: {
      id_heroe: {
        type: "number",
        description: "id_heroe id del heroe",
      },
      color: {
        type: "string",
        description: "color del equipo del heroe",
      },
      
    },
    required: ["id_heroe", "color"],
    additionalProperties: false,
  };

  module.exports = { heroeTeamColorSchema }