import { styled } from "..";

export const CartContainer = styled('aside', {
  variants: {
    isOpen: {
      true: {
        transition: 'opacity 0.2s ease-in',
        opacity: 1,
        // visibility: 'visible'
      },
      false: {
        transition: 'opacity 0.2s ease-out',
        opacity: 0,
        visibility: 'collapse'
      }
    }
  },
  display: 'flex',
  flexDirection: 'column',

  background: '$gray800',
  position: 'absolute',

  width: 480,
  height: '100%',
  maxHeight: '100vh',
  boxShadow: '-4px 0 30px 0 rgba(0, 0, 0, 0.8)',
  padding: '1.5rem 3rem 3rem 3rem',
  margin: '0 auto',
  alignSelf: "flex-end",


  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  h1: {
    fontSize: '$lg',
    fontWeight: 'bold'
  },

  main: {
    marginTop: '2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(1fr, 1)',
    gap: "1.5rem"
  },

  footer: {
    position: 'absolute',
    bottom: '2rem',
    left: '3rem',
    right: '3rem',

    display: 'flex',
    flexDirection: 'column',

    '>button': {
      width: '100%',
      maxWidth: 384,
      height: 69,
      borderRadius: 8,
      background: '$green500',
      color: '$white',
      fontWeight: 'bold',

      border: 'none',
      marginTop: '3.45rem',

      '&:hover': {
        transition: 'background 0.2s',
        background: '$green300',
      }
    }
  },


});

export const ItemContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
  width: 384,
  height: 94,

  div: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',

    height: '100%',

    p: {
      fontSize: '$md',
      color: '$gray300'
    },

    span: {
      marginTop: '0.5rem',
      fontWeight: 'bold'
    },

    button: {
      alignSelf: 'flex-start',
      marginTop: '1.5rem',
      border: 'none',
      background: 'transparent',
      display: 'block',
      color: '$green500',
      fontWeight: 'bold',

      '&:hover': {
        transition: 'color 0.1s',
        color: '$green300'
      }
    }
  }
})

export const ImageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',

  width: '100%',
  maxWidth: 94.8,
  height: 94.8,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  position: 'relative',

  span: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    top: -15,
    right: -10,

    background: '$green300',
    borderRadius: 9999,
    width: 24,
    height: 24,

  },

  img: {
    objectFit: 'cover'
  }
})

export const QuantityContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  p: {
    color: '$gray100'
  },

  span: {
    fontSize: '$md',
    color: '$gray300'
  }
})

export const TotalPriceContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '0.5rem',

  p: {
    fontSize: '$md',
    color: '$gray100',
    fontWeight: 'bold'
  },

  span: {
    fontSize: '$xl',
    color: '$gray100',
    fontWeight: 'bold'
  }
})