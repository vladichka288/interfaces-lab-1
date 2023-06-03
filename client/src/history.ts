// Copyright 2021 Green Badger LLC

import { createBrowserHistory } from 'history'

export const HistorySymbol = Symbol.for('history')

const history = createBrowserHistory()

export default history
