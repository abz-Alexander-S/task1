import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import './App.css';

function App() {
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '50px 0',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '60%',
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }));
  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: {
      value: 'Valeraq',
      validator: Validators.nameValidator,
      error: false,
    },
    email: {
      value: 'kril@q.qq',
      validator: Validators.emailValidator,
      error: false,
    },
    emailRFC: {
      value: 'kril@q.qq',
      validator: Validators.emailRFCValidator,
      error: false,
    },
    id: {
      value: '',
      validator: Validators.id,
      error: false,
    },
    idMasked: {
      value: '',
      validator: Validators.id,
      error: false,
    },
    phone: {
      value: '',
      validator: Validators.phone,
      error: false,
    },
    pin: {
      value: '',
      validator: Validators.pin,
      error: false,
    },
    multiline: {
      value: '',
      validator: Validators.multiline,
      lineChecker: Validators.multilineLineChecker,
      sizeChecker: Validators.multilineSizeChecker,
      error: false,
    },
  });

  const handleChange = name => event => {
    let currentFieldValue = event.target.value;

    let currentValues = {
      value: currentFieldValue,
      validator: values[name].validator,
      error: !values[name].validator(currentFieldValue),
    };
    switch (name) {
      case 'multiline':
        currentValues.lineChecker = Validators.multilineLineChecker;
        currentValues.sizeChecker = Validators.multilineSizeChecker;
        break;

      default:
    }
    setValues({ ...values, [name]: currentValues });
  };

  const onBlurChecker = name => event => {
    let currentFieldValue = event.target.value;

    switch (name) {
      case 'multiline':
        currentFieldValue = values[name].lineChecker(currentFieldValue);
        currentFieldValue = ((currentFieldValue) => {
          let lines = currentFieldValue.split('\n');

          return lines.reduce((correctString, line, lineNumber) => {
            line = line.trim();
            if (lineNumber === 0) return line;
            return [correctString, line].join('\n');
          }, '');
        })();
        currentFieldValue = values[name].sizeChecker(currentFieldValue);
        break;

      default:
    }

    let currentValues = {
      value: currentFieldValue,
      validator: values[name].validator,
      error: !values[name].validator(currentFieldValue),
    };
    switch (name) {
      case 'multiline':
        currentValues.lineChecker = Validators.multilineLineChecker;
        currentValues.sizeChecker = Validators.multilineSizeChecker;
        break;

      default:
    }
    setValues({ ...values, [name]: currentValues });
  };

  return (
    <div className="App">
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={values.name.value}
            error={values.name.error}
            onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
        />
        <TextField
            id="outlined-name"
            label="Email"
            className={classes.textField}
            value={values.email.value}
            error={values.email.error}
            onChange={handleChange('email')}
            margin="normal"
            variant="outlined"
        />
        <TextField
            id="outlined-name"
            label="Email RFC"
            className={classes.textField}
            value={values.emailRFC.value}
            error={values.emailRFC.error}
            onChange={handleChange('emailRFC')}
            margin="normal"
            variant="outlined"
        />
        <TextField
            id="outlined-name"
            label="ID"
            className={classes.textField}
            value={values.id.value}
            error={values.id.error}
            onChange={handleChange('id')}
            margin="normal"
            variant="outlined"
        />
        <TextField
            id="outlined-name"
            label="ID Masked"
            className={classes.textField}
            value={values.idMasked.value}
            error={values.idMasked.error}
            onChange={handleChange('idMasked')}
            InputProps={{
              inputComponent: Masks.idMaskedMask,
            }}
            margin="normal"
            variant="outlined"
        />
        <TextField
            id="outlined-name"
            label="Phone Number"
            className={classes.textField}
            value={values.phone.value}
            error={values.phone.error}
            onChange={handleChange('phone')}
            InputProps={{
              inputComponent: Masks.phoneMask,
            }}
            margin="normal"
            variant="outlined"
        />
        <TextField
            id="outlined-name"
            label="Pin"
            className={classes.textField}
            value={values.pin.value}
            error={values.pin.error}
            onChange={handleChange('pin')}
            InputProps={{
              inputComponent: Masks.pinMask,
            }}
            margin="normal"
            variant="outlined"
        />
        <TextField
            id="outlined-name"
            label="Multiline"
            className={classes.textField}
            value={values.multiline.value}
            error={values.multiline.error}
            onChange={handleChange('multiline')}
            onBlur={onBlurChecker('multiline')}
            margin="normal"
            variant="outlined"
            multiline
        />
      </form>
    </div>
  );
}

class Validators {}
Validators.nameValidator = (name) => {
  const regexp = /^[a-z\s]{2,128}$/i;
  return regexp.test( name.trim() );
};
Validators.emailValidator = (email) => {
  email = email.trim();
  const regexpValue = /^[\w\d]+@[\w\d]+\.[\w\d]+$/;
  const regexpLength = /^.{6,254}$/;
  return regexpLength.test( email ) && regexpValue.test( email );
};
Validators.emailRFCValidator = (email) => {
  email = email.trim();
  const regexpValue = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return regexpValue.test(email);
};
Validators.id = (id) => {
  const regexp = /^[a-z\d_]{2,128}$/;
  return regexp.test( id.trim() );
};
Validators.phone = (phone) => {
  const regexp = /\+38\(\d\d\d\)\s\d\d\d-\d\d-\d\d/;
  return regexp.test( phone.trim() );
};
Validators.pin = (pin) => {
  const regexp = /\d\d\d\d-\d\d\d\d/;
  return regexp.test( pin.trim() );
};
Validators.multiline = (text) => {
  return true;
};
Validators.multilineLineChecker = (text) => {
  let lines = text.split('\n');
  let countOfAllowLines = 2;
  console.log(lines);
  //if (lines.length <= countOfAllowLines) return text;

  let allowedLinesString = lines.reduce((correctString, line, lineNumber) => {
    if (lineNumber === 0) return line;
    if (lineNumber <= countOfAllowLines) {
      return [correctString, line].join('\n');
    } else if (line != '') {
      return [correctString, line].join(' ');
    } else {
      return correctString;
    }
  }, '');
  return allowedLinesString;
};
Validators.multilineSizeChecker = (text) => {
  if (text.length > 500) return text.slice();
  return text;
}

class Masks {}
Masks.idMaskedMask = (props) => {
  const { inputRef, ...other } = props;

  return (
      <MaskedInput
          {...other}
          ref={ref => {
            inputRef(ref ? ref.inputElement : null);
          }}
          mask={[
            /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/,
            /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/,
            /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/,
            /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/,
            /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/,
            /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/,
            /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/,
            /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, /\w/,
          ]}
          guide={false}
          placeholderChar={'_'}
          showMask
      />
  );
};
Masks.idMaskedMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

Masks.phoneMask = (props) => {
  const { inputRef, ...other } = props;

  return (
      <MaskedInput
          {...other}
          ref={ref => {
            inputRef(ref ? ref.inputElement : null);
          }}
          mask={['+', '3', '8', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
          placeholderChar={'_'}
          showMask
      />
  );
};
Masks.phoneMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

Masks.pinMask = (props) => {
  const { inputRef, ...other } = props;

  return (
      <MaskedInput
          {...other}
          ref={ref => {
            inputRef(ref ? ref.inputElement : null);
          }}
          mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          placeholderChar={'_'}
          showMask
      />
  );
};
Masks.pinMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default App;
