import React,{ useState, useEffect } from 'react'

import { InputUploadView } from './inputUploadView'


export default function InputUploadPdf() {
  const [images, setImages] = useState([] as any);
  const [imageURLS, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls: any = [];
    images.forEach((image:any) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e: any) {
    setImages([...e.target.files]);
    // console.log(e);
  }

  return (
    <InputUploadView>

<div className='imgContainer'>
        <article>
        {imageURLS.map((imageSrc, index) => (
          <img key={index} className="image" src={imageSrc} alt="not fount"  />
        ))}

      </article>

    </div>

        <div className="update">

        <form action="">
          <div >
            <label  htmlFor="arquivo"> <p className='TitleButton'> Enviar foto de Perfil </p>   </label>
            <input  type="file" name='arquivo' id='arquivo' onChange={onImageChange} />
          </div>
        </form>
      </div>

    </InputUploadView>
  )
}
