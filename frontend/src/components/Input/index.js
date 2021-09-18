import { FormControl } from 'react-bootstrap';

import { STATUSCOLOR } from '../../constants';

export default function Input() {
  return (
    <div className="d-flex justify-content-center align-items-center px-5 pt-5">
      <FormControl
        style={{
          borderColor: 'black',
          borderRadius: '1rem',
          fontSize: '1.75rem',
          // backgroundColor: inputStatus === stateCode.INCORRECT && '#faa7a7',
        }}
        value={'input here'}
        // onChange={(e) => onInputChange(e.target.value)}
        aria-label="Username"
      />
    </div>
  );
}
