import { useRef, useEffect } from "react";
import styled from "styled-components";

const Image = styled.img`
  object-fit: cover;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem;
`;

const ImageWithFallback = ({ url }: { url: string }) => {
  const imgRef = useRef<any>(null);

  const onLoad = () => {
    if (imgRef.current.naturalHeight < 10 || imgRef.current.naturalWidth < 10) {
      imgRef.current.src =
        "https://readersend.com/wp-content/uploads/2018/04/book-sample_preview-1.png";
    }
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      onLoad();
    }
  }, [imgRef]);
  return <Image onLoad={onLoad} ref={imgRef} src={url} alt="book cover" />;
};

export default ImageWithFallback;
