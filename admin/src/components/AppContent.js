import React, { Suspense } from 'react'
import PropTypes from 'prop-types';
import { CContainer, CSpinner } from '@coreui/react'

const Genre = React.lazy(() => import('../views/genre/Genre'))
const Urls = React.lazy(() => import('../views/urls/Urls'))
const Blogs = React.lazy(() => import('../views/blogs/Blogs'))
const Setting = React.lazy(() => import('../views/setting/Setting'))

const AppContent = ({ subChild }) => {
  
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        {
          subChild==="Genre" && <Genre /> ||
          subChild==="Urls" && <Urls /> ||
          subChild==="Blog" && <Blogs /> ||
          subChild==="Setting" && <Setting /> 
        }
      </Suspense>
    </CContainer>
  )
}

AppContent.propTypes = {
  subChild: PropTypes.any,
};

export default React.memo(AppContent)
