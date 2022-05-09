import React from 'react';
import Image from 'next/image';
import BasicButton from '../src/components/buttons/basicButton/BasicButton'

import { TelemetriaView} from  '../styles/layouts/telemetria/TelemetriaView';



export default function Telemetria() {
  return(
    <TelemetriaView>

        <section className="container">
        <Image src='/assets/graphical.png' width={970} height={200} layout='fixed'/>


        </section>
        <BasicButton title='texto'/>






    </TelemetriaView>



  )
}
