import { GetServerSideProps } from 'next'

export default function IndustryInfoDownloadRedirect() {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/info-setorial/download',
      permanent: false
    }
  }
}