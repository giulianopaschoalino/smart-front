import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import RenderIf from '../../utils/renderIf';
import { SidebarView } from './SidebarView'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ economiaDrawer, setEconomiaDrawer ] = useState(false)

  const [ viewModal, setViewModal ] = useState(false)

  const router = useRouter()

  const user = {
    role: 'client'
  }

  useEffect(() => {
    setViewModal(false)
  }, [router.pathname])

  return (
    <>
      <RenderIf isTrue={user.role === 'admin'}>
        <SidebarView economiaDrawer={economiaDrawer} modalOpen={viewModal} >
          <div className='hamburger' onClick={() => setViewModal(!viewModal)} >
            <Image src='/assets/hamburgerModal.svg' width={60} height={60} />
          </div>
          <div className='imageNext'>
            <Image src='/assets/logo.svg' width={100} height={100} />
          </div>
          <ul>
            <Link href='/administrative'><li className={router.pathname=='/administrative'? 'actualPath' : null} ><Image src='/assets/sidebar/dashboardIcon.svg' width={25} height={25} />{'Visão Geral'}</li></Link>
            {/* <li onClick={() => setEconomiaDrawer(!economiaDrawer)} className={router.pathname=='/grossSavings' || router.pathname=='/accumulatedSavings' || router.pathname=='/estimatedCost' || router.pathname=='/costIndicator' ? 'actualPath' : null } ><Image src='/assets/sidebar/economyIcon.svg' width={25} height={25} />{'Economia >'}</li>
              <div className='economiaDrawer drawer' >
                <Link href='/administrative/grossSavings'><li className={router.pathname=='/grossSavings'? 'actualPathDrawer' : null}>Economia Bruta</li></Link>
                <Link href='/administrative/accumulatedSavings'><li className={router.pathname=='/accumulatedSavings'? 'actualPathDrawer' : null}>Economia Acumulada</li></Link>
                <Link href='/administrative/estimatedCost'><li className={router.pathname=='/estimatedCost'? 'actualPathDrawer' : null}>Custo Estimado</li></Link>
                <Link href='/administrative/costIndicator'><li className={router.pathname=='/costIndicator'? 'actualPathDrawer' : null}>Custo R/MWh</li></Link>
              </div> */}
            <Link href='/administrative/clients'><li className={router.pathname=='/administrative/clients' ? 'actualPath' : null } ><Image src='/assets/sidebar/economyIcon.svg' width={25} height={25} />{'Clientes >'}</li></Link>
            <Link href='/administrative/faq'><li className={router.pathname=='/administrative/faq' ? 'actualPath' : null } ><Image src='/assets/sidebar/saqIcon.svg' width={25} height={25} />{'FAQ >'}</li></Link>
            <Link href='/administrative/notifications'><li className={router.pathname=='/administrative/notifications'? 'actualPath' : null}><Image src='/assets/sidebar/notificationsIcon.svg' width={25} height={25} />{'Notificações >'}<div className='notification'><p>25</p></div></li></Link>
            {/* <Link href='/administrative/telemetria'><li className={router.pathname=='/telemetria'? 'actualPath' : null}><Image src='/assets/sidebar/telemetryIcon.svg' width={25} height={25} />{'Telemetria >'}</li></Link>
            <Link href='/administrative/resumoOperacao'><li className={router.pathname=='/resumoOperacao'? 'actualPath' : null} ><Image src='/assets/sidebar/summaryOperationsIcon.svg' width={25} height={25} />{'Resumo de Op. '}</li></Link>
            <Link href='/administrative/news'><li className={router.pathname=='/news'? 'actualPath' : null}><Image src='/assets/sidebar/newsIcon.svg' width={25} height={25} />{'Notícias >'}</li></Link>
            <Link href='/administrative/pld'><li className={router.pathname=='/pld'? 'actualPath' : null}><Image src='/assets/sidebar/newsIcon.svg' width={25} height={25} />{'PLD >'}</li></Link>
            <Link href='/administrative/industryInfo'><li className={router.pathname=='/industryInfo'? 'actualPath' : null}><Image src='/assets/sidebar/sectorialInfoIcon.svg' width={25} height={25} />{'Info Setorial >'}</li></Link>
            <Link href='/consumption'><li className={router.pathname=='/consumption'? 'actualPath' : null} ><Image src='/assets/sidebar/consumptionIcon.svg' width={25} height={25} />{'Consumo'}</li></Link>
            <Link href='/administrative/notifications'><li className={router.pathname=='/notifications'? 'actualPath' : null}><Image src='/assets/sidebar/notificationsIcon.svg' width={25} height={25} />{'Notificações >'}<div className='notification'><p>25</p></div></li></Link>
            <Link href='/administrative/aboutUs'><li className={router.pathname=='/aboutUs'? 'actualPath' : null}><Image src='/assets/sidebar/aboutUs.svg' width={25} height={25} />{'Sobre Nós >'}</li></Link>
            <Link href='/administrative/faq'><li className={router.pathname=='/faq'? 'actualPath' : null}><Image src='/assets/sidebar/saqIcon.svg' width={25} height={25} />{'FAQ >'}</li></Link> */}
            <button onClick={handleOpen}><Image src='/assets/logout.svg' width={25} height={25} />{'Sair'}</button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Deseja realmente sair ?
              </Typography>
              <Link href='/'><Button variant="contained"  sx={{mt:5}}>Sim</Button></Link>
              <Button variant="contained" onClick={handleClose} color="error" sx={{mt:5 ,ml:1}}>Não</Button>
            </Box>
          </Modal>
          </ul>
          <aside>
            <p>Nossos Gerentes estão prontos para atendê-los</p>
            <div><h3>+55(41) 3012-5900</h3></div>
          </aside>
        </SidebarView>
      </RenderIf>
      <RenderIf isTrue={user.role === 'client'}>
        <SidebarView economiaDrawer={economiaDrawer} modalOpen={viewModal} >
          <div className='hamburger' onClick={() => setViewModal(!viewModal)} >
            <Image src='/assets/hamburgerModal.svg' width={60} height={60} />
          </div>
          <div className='imageNext'>
            <Image src='/assets/logo.svg' width={100} height={100} />
          </div>
          <ul>
            <Link href='/dashboard'><li className={router.pathname=='/dashboard'? 'actualPath' : null} ><Image src='/assets/sidebar/dashboardIcon.svg' width={25} height={25} />{'Visão Geral'}</li></Link>
            <li onClick={() => setEconomiaDrawer(!economiaDrawer)} className={router.pathname=='/grossSavings' || router.pathname=='/accumulatedSavings' || router.pathname=='/estimatedCost' || router.pathname=='/costIndicator' ? 'actualPath' : null } ><Image src='/assets/sidebar/economyIcon.svg' width={25} height={25} />{'Economia >'}</li>
              <div className='economiaDrawer drawer' >
                <Link href='/grossSavings'><li className={router.pathname=='/grossSavings'? 'actualPathDrawer' : null}>Economia Bruta</li></Link>
                <Link href='/accumulatedSavings'><li className={router.pathname=='/accumulatedSavings'? 'actualPathDrawer' : null}>Economia Acumulada</li></Link>
                <Link href='/estimatedCost'><li className={router.pathname=='/estimatedCost'? 'actualPathDrawer' : null}>Custo Estimado</li></Link>
                <Link href='/costIndicator'><li className={router.pathname=='/costIndicator'? 'actualPathDrawer' : null}>Custo R/MWh</li></Link>
              </div>
            <Link href='/telemetria'><li className={router.pathname=='/telemetria'? 'actualPath' : null}><Image src='/assets/sidebar/telemetryIcon.svg' width={25} height={25} />{'Telemetria >'}</li></Link>
            <Link href='/resumoOperacao'><li className={router.pathname=='/resumoOperacao'? 'actualPath' : null} ><Image src='/assets/sidebar/summaryOperationsIcon.svg' width={25} height={25} />{'Resumo de Op. '}</li></Link>
            <Link href='/news'><li className={router.pathname=='/news'? 'actualPath' : null}><Image src='/assets/sidebar/newsIcon.svg' width={25} height={25} />{'Notícias >'}</li></Link>
            <Link href='/pld'><li className={router.pathname=='/pld'? 'actualPath' : null}><Image src='/assets/sidebar/newsIcon.svg' width={25} height={25} />{'PLD >'}</li></Link>
            <Link href='/industryInfo'><li className={router.pathname=='/industryInfo'? 'actualPath' : null}><Image src='/assets/sidebar/sectorialInfoIcon.svg' width={25} height={25} />{'Info Setorial >'}</li></Link>
            {/* <Link href='/consumption'><li className={router.pathname=='/consumption'? 'actualPath' : null} ><Image src='/assets/sidebar/consumptionIcon.svg' width={25} height={25} />{'Consumo'}</li></Link> */}
            <Link href='/notifications'><li className={router.pathname=='/notifications'? 'actualPath' : null}><Image src='/assets/sidebar/notificationsIcon.svg' width={25} height={25} />{'Notificações >'}<div className='notification'><p>25</p></div></li></Link>
            <Link href='/aboutUs'><li className={router.pathname=='/aboutUs'? 'actualPath' : null}><Image src='/assets/sidebar/aboutUs.svg' width={25} height={25} />{'Sobre Nós >'}</li></Link>
            <Link href='/faq'><li className={router.pathname=='/faq'? 'actualPath' : null}><Image src='/assets/sidebar/saqIcon.svg' width={25} height={25} />{'FAQ >'}</li></Link>
            <button onClick={handleOpen}><Image src='/assets/logout.svg' width={25} height={25} />{'Sair'}</button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Deseja realmente sair ?
              </Typography>
              <Link href='/'><Button variant="contained"  sx={{mt:5}}>Sim</Button></Link>
              <Button variant="contained" onClick={handleClose} color="error" sx={{mt:5 ,ml:1}}>Não</Button>
            </Box>
          </Modal>
          </ul>
          <aside>
            <p>Nossos Gerentes estão prontos para atendê-los</p>
            <div><h3>+55(41) 3012-5900</h3></div>
          </aside>
        </SidebarView>
      </RenderIf>
    </>
  )
}
