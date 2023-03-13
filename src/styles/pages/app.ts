import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto'
})

export const IconContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',
  background: '$gray800',
  borderRadius: 6,
  width: 48,
  height: 48,
  position: 'relative',

  span: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    background: '$green500',
    borderRadius: 9999,
    width: 24,
    height: 24,
    fontSize: '$sm',
    fontWeight: 'bold',

    position: 'absolute',
    top: -5,
    right: -10
  }
})