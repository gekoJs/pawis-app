export async function filterByQuery({
  name,
  techniques,
  categories,
  supports,
}) {
  let techniques_str = techniques ? techniques.toString() : null;
  if (Array.isArray(techniques)) {
    techniques_str = techniques.join("&technique_id=");
  }

  let categories_str = categories ? categories.toString() : null;
  if (Array.isArray(categories)) {
    categories_str = categories.join("&category_id=");
  }

  let supports_str = supports ? supports.toString() : null;
  if (Array.isArray(supports)) {
    supports_str = supports.join("&support_id=");
  }

  const filteredArtworks = await axios
    .get(
      `${process.env.NEXT_PUBLIC_HOST}/api/artworks/filter?technique_id=${techniques_str}&category_id=${categories_str}&support_id=${supports_str}&name=${name}`
    )
    .then((res) => res.data)
    .catch((error) => {
      return { message: error.message };
    });

  return filteredArtworks;
}
