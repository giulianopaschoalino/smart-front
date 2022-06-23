import React,{ useState, useEffect } from 'react'
import Image from 'next/image';


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

     {imageURLS.map((imageSrc, index) => (
          <Image src='/assets/iconePDf.png' key={index} width={30} height={30} className="image" />
        ))}




    </div>

    <div className="update">

<form action="">
  <div className='testess'>
    <label  htmlFor="arquivo"> <p className='TitleButton'> Enviar PDF </p>   </label>
    <input  type="file" name='arquivo' id='arquivo' onChange={onImageChange} />
  </div>
</form>
</div>
    </InputUploadView>
  )
}
