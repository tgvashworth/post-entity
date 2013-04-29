var pe = {

  /**
   * Types are name & regular expression objected used to extract entities.
   * All types must be a global regex for the entity extraction to work
   */
  types: [
    { name: 'hashtag',
      regexp: /#\w+/g },
    { name: 'cashtag',
      regexp: /\$[A-Z]+/g },
    { name: 'mention',
      regexp: /@\w+/g },
    { name: 'link',
      regexp: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig }
  ],

  /**
   * Extracts entities as specified in the types object from a string.
   * Optionally pass in your own array of types in the same form as pe.types
   * to have it extract anything.
   *
   * Return an array of entities, ordered by index.
   */
  entities: function (str, types) {
    if (!str && str !== '') throw new Error("Entities requires a non-empty string.");
    types = types || pe.types;
    if (!types) throw new Error("No types found.");
    var entities = [];
    types.forEach(function (type) {
      var match;
      while ((match = type.regexp.exec(str)) !== null) {
        entities.push({
          type: type.name,
          index: match.index,
          raw: match[0]
        });
      }
    });
    return entities.sort(function (a, b) {
      return a.index > b.index;
    });
  },

  /**
   * Turns a string into a parsed array of enties: those defined in types and
   * text blocks.
   *
   * Returns an array of entities.
   */
  process: function (str, types) {
    var entities = pe.entities(str, types),
        segments = [],
        remaining = str,
        removed = 0;
    entities.forEach(function (entity) {
      // Figure out where the entity begins and ends
      var entityStart = entity.index - removed,
          entityEnd = entityStart + entity.raw.length,
          pre = remaining.slice(0, entityStart);
      // There's some text before this – add it
      if (pre) {
        segments.push({
          type: 'text',
          raw: pre,
          index: removed
        });
      }
      // Push the current entity
      segments.push(entity);
      // Update what was remove and what's left over for the next entity
      remaining = remaining.slice(entityEnd);
      removed += entityEnd;
    });
    segments.push({
      type: 'text',
      raw: remaining,
      index: removed
    });
    return segments;
  }
};

module.exports = pe;