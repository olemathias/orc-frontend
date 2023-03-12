export function getTagValue(tags, tag, defaultValue = null) {
  return Array.isArray(tags)
    ? tags.find((x) => x.key == tag)?.value
      ? tags.find((x) => x.key == tag).value
      : defaultValue
    : defaultValue;
}
