import React from 'react';
import { DatePicker } from 'antd';

const App = ({onClick}) => <DatePicker onChange={onClick} needConfirm />;
export default App;