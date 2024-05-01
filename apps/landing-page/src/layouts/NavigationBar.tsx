import { ListGroup } from '@polyms/core-ui'
import { Link } from '@tanstack/react-router'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

import LayersIcon from '../assets/layers.svg'
import LayoutIcon from '../assets/layout.svg'
import RocketIcon from '../assets/rocket.svg'

export const NavigationBar = () => {
  return (
    <Sidebar className='border-end p-2'>
      <div className='d-flex align-items-center gap-2'>
        <img src='/favicon.png' alt='favicon' height={40} />
        <h4 className='mb-0 text-primary'>
          <Link to='/'>Polyms Core UI</Link>
        </h4>
      </div>

      <Heading icon={RocketIcon} iconClassName='text-primary'>
        Getting started
      </Heading>
      <ListGroup>
        <ListGroupLink href='/'>Introduction</ListGroupLink>
      </ListGroup>

      <Heading icon={LayoutIcon} iconClassName='text-primary'>
        Layout
      </Heading>
      <ListGroup>
        <ListGroupLink href='/container'>Container</ListGroupLink>
      </ListGroup>

      <Heading icon={LayersIcon} iconClassName='text-danger'>
        Components
      </Heading>
      <ListGroup>
        <ListGroupLink href='/buttons'>Buttons</ListGroupLink>
      </ListGroup>
      <ListGroup>
        <ListGroupLink href='/list-group'>List Group</ListGroupLink>
      </ListGroup>
    </Sidebar>
  )
}

const Heading = ({ icon: Icon, iconClassName, children }: HeadingProps) => {
  return (
    <h5 className='mt-4 d-flex align-items-center gap-2'>
      <Icon width={16} height={16} className={iconClassName} />
      {children}
    </h5>
  )
}

const ListGroupLink = ({ href, icon: Icon, children }: ListGroupLinkProps) => {
  return (
    <Link
      to={href}
      className={classNames(
        'rounded d-flex gap-2',
        'list-group-item',
        'list-group-item-action',
        '[&.active]:active',
        {
          'px-4': !Icon,
        }
      )}
    >
      {Icon && <Icon width={24} height={24} />}
      {children}
    </Link>
  )
}

const Sidebar = styled.div`
  width: var(--po-sidebar-width);
  position: fixed;
  top: 0;
  bottom: 0;
  border-right-style: dashed !important;

  .list-group {
    --po-list-group-border-width: 0;
  }
`

// ======================================================================================

type HeadingProps = PropsWithChildren<{
  icon: SvgComponent
  iconClassName?: string
}>

type ListGroupLinkProps = PropsWithChildren<{
  href: string
  icon?: SvgComponent
}>
