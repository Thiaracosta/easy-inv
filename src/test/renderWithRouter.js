import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history'

function renderWithRouter(componentToRender) {

  const customHistory = createMemoryHistory()

  const utils = render(
    <Router history={customHistory}>
      {componentToRender}
    </Router>
  );

  return {history: customHistory, ...utils}
}

export default renderWithRouter