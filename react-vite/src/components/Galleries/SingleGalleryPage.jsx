import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetGallery } from "../../redux/galleries";

export default function SingleGallery() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gallery = useSelector(state => state.galleries.singleGallery);

  useEffect(() => {
    dispatch(thunkGetGallery(id));
  }, [dispatch, id]);

  if (!gallery.id) return <p>Loading gallery...</p>;

  return (
    <div className="single-gallery-page">
      <h2 dangerouslySetInnerHTML={{ __html: gallery.title }} />
      <img src={gallery.image} alt={gallery.title} />
      {gallery.surah && gallery.verse && (
        <p>Surah {gallery.surah}, Verse {gallery.verse}</p>
      )}
      <div dangerouslySetInnerHTML={{ __html: gallery.description }} />
      </div>
  );
}
