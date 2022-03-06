// material ui can use breakpoints so we can define different styles for different device types as below
//...where we say that for mobile ('sm') we want the form on top

import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        marginLeft: '15px',
      }
}));