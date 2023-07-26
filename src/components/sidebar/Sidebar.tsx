import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import Image from 'next/image'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../contexts/AuthContext';
import { MenuContext } from '../../contexts/menu/MenuContext';

import { api } from '../../services/api';

import RenderIf from '../../utils/renderIf';
import { ModalContainer, SidebarView } from './SidebarView'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 400,
  width: 500,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,

  borderRadius: 3
};

export default function Sidebar() {
  const {pldMenu, setPldMenu, economyMenu, setEconomyMenu} = useContext(MenuContext)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { signOut } = useContext(AuthContext)

  const [ economiaDrawer, setEconomiaDrawer ] = useState(false)
  const [ pldDrawer, setPldDrawer ] = useState(false)

  const [ notificationsCount, setNotificationsCount ] = useState<number>(0)

  const [ viewModal, setViewModal ] = useState(false)

  const router = useRouter()

  const { ['user-role']: role } = parseCookies()

  useEffect(() => {
    setViewModal(false)
  }, [router.pathname])

  useEffect(() => {
    api.post('/notify').then(res => {
      setNotificationsCount(res.data)
    })
  }, [])

  return (
    <>
      <RenderIf isTrue={role === '1'}>
        <SidebarView economiaDrawer={economiaDrawer} modalOpen={viewModal} >
          <div className='hamburger' onClick={() => setViewModal(!viewModal)} >
            <Image src='/assets/hamburgerModal.svg' width={60} height={60} />
          </div>
          <div className='imageNext'>
            <Image src='/assets/logo.svg' width={100} height={100} />
          </div>
          <ul>
            <Link href='/administrative/clients'><li className={router.pathname=='/administrative/clients' ? 'actualPath' : null } ><Image src='/assets/sidebar/economyIcon.svg' width={25} height={25} />{'Clientes >'}</li></Link>
            <Link href='/administrative/general'><li className={router.pathname=='/administrative/general'? 'actualPath' : null} ><Image src='/assets/sidebar/aboutUs.svg' width={25} height={25} />{'Sobre Nós'}</li></Link>
            <Link href='/administrative/faq'><li className={router.pathname=='/administrative/faq' ? 'actualPath' : null } ><Image src='/assets/sidebar/saqIcon.svg' width={25} height={25} />{'FAQ >'}</li></Link>
            <Link href='/administrative/notification'><li className={router.pathname=='/administrative/notification'? 'actualPath' : null}><Image src='/assets/sidebar/notificationsIcon.svg' width={25} height={25} />{'Notificações >'}</li></Link>
            <Link href='/administrative/industryInfo'><li className={router.pathname=='/administrative/industryInfo'? 'actualPath' : null} ><Image src='/assets/sidebar/aboutUs.svg' width={25} height={25} />{'Info Setorial'}</li></Link>
            <button onClick={handleOpen}><Image src='/assets/logout.svg' width={25} height={25} />{'Sair'}</button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <ModalContainer>
                <Image src='/assets/marca1.png' width={250} height={200}/>
                <Typography id="modal-modal-title" variant="subtitle2" component="p" style={{color: 'gray'}}>
                  Deseja realmente sair ?
                </Typography>
                <article>
                  <Link href='/'><button onClick={() => signOut()}>Sair</button></Link>
                  <button onClick={handleClose} color="error">Voltar</button>
                </article>
              </ModalContainer>
            </Box>
          </Modal>
          </ul>
          <aside>
            <p>Nossos Gerentes estão prontos para atendê-los</p>
            <div><h3>+55(41) 3012-5900</h3></div>
          </aside>
        </SidebarView>
      </RenderIf>

      <RenderIf isTrue={role === '2'}>
        <SidebarView economiaDrawer={economiaDrawer} pldDrawer={pldDrawer} modalOpen={viewModal} >
          <div className='hamburger' onClick={() => setViewModal(!viewModal)} >
            <Image src='/assets/hamburgerModal.svg' width={55} height={55} />
          </div>
          <div className='imageNext'>
            <Image src='/assets/logo.svg' width={150} height={150} />
          </div>
          <ul>
            <Link href='/dashboard'><li className={router.pathname=='/dashboard'? 'actualPath' : null} ><Image src='/assets/sidebar/dashboardIcon.svg' width={25} height={25} />{'Visão Geral'}</li></Link>
            <Link href='/economy'><li onClick={() => setEconomiaDrawer(!economiaDrawer)} className={router.pathname=='/economy'? 'actualPath' : null } ><Image src='/assets/sidebar/economyIcon.svg' width={25} height={25} />{'Economia'}</li></Link>
            <Link href='/telemetria'><li className={router.pathname=='/telemetria'? 'actualPath' : null}><Image src='/assets/sidebar/telemetryIcon.svg' width={25} height={25} />{'Telemetria'}</li></Link>
            <Link href='/resumoOperacao'><li className={router.pathname=='/resumoOperacao'? 'actualPath' : null} ><Image src='/assets/sidebar/summaryOperationsIcon.svg' width={25} height={25} />{'Resumo de Op. '}</li></Link>
            <Link href='/news'><li className={router.pathname=='/news'? 'actualPath' : null}><Image src='/assets/sidebar/newsIcon.svg' width={25} height={25} />{'Notícias'}</li></Link>
            <Link href='/pld'><li onClick={() => setPldDrawer(!pldDrawer)} className={router.pathname=='/pld'? 'actualPath' : null}><Image src='/assets/sidebar/newsIcon.svg' width={25} height={25} />{'PLD'}</li></Link>
            <Link href='/industryInfo'><li className={router.pathname=='/industryInfo'? 'actualPath' : null}><Image src='/assets/sidebar/sectorialInfoIcon.svg' width={25} height={25} />{'Info Setorial'}</li></Link>
            <Link href='/notifications'><li className={router.pathname=='/notifications'? 'actualPath' : null}><Image src='/assets/sidebar/notificationsIcon.svg' width={25} height={25} />{'Notificações'}<div className='notification' style={{display: notificationsCount<=0||notificationsCount===undefined? 'inherit' : 'inherit'}}><p>{notificationsCount}</p></div></li></Link>
            <Link href='/aboutUs'><li className={router.pathname=='/aboutUs'? 'actualPath' : null}><Image src='/assets/sidebar/aboutUs.svg' width={25} height={25} />{'Sobre Nós'}</li></Link>
            <Link href='/faq'><li className={router.pathname=='/faq'? 'actualPath' : null}><Image src='/assets/sidebar/saqIcon.svg' width={25} height={25} />{'FAQ'}</li></Link>
            <button onClick={handleOpen}><Image src='/assets/logout.svg' width={25} height={25} />{'Sair'}</button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ModalContainer>
                  <Image src='/assets/marca1.png' width={210} height={160}/>
                  <Typography id="modal-modal-title" variant="subtitle2" component="p" style={{color: 'gray', marginTop: '15px'}}>
                    Deseja realmente sair ?
                  </Typography>
                  <article>
                    <Link href='/'><button onClick={() => signOut()}>Sair</button></Link>
                    <button onClick={handleClose} color="error">Voltar</button>
                  </article>
                </ModalContainer>
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
