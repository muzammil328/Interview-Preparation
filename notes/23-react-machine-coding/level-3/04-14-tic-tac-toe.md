---
id: 14-tic-tac-toe
title: "14. Tic-Tac-Toe"
sidebar_label: "14. Tic-Tac-Toe"
sidebar_position: 4
description: "14. Tic-Tac-Toe — React Machine Coding interview notes."
---
**Requirements:** two players take turns on a 3×3 grid, detect a winner or a draw, restart.

```text
index:  0 │ 1 │ 2        winning lines (8):
       ───┼───┼───        rows     [0,1,2] [3,4,5] [6,7,8]
        3 │ 4 │ 5         columns  [0,3,6] [1,4,7] [2,5,8]
       ───┼───┼───        diagonal [0,4,8] [2,4,6]
        6 │ 7 │ 8
```

```jsx
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function getWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const winner = getWinner(board);
  const isDraw = !winner && board.every(Boolean);
  const xIsNext = board.filter(Boolean).length % 2 === 0;

  function play(i) {
    if (board[i] || winner) return;
    const next = [...board];
    next[i] = xIsNext ? 'X' : 'O';
    setBoard(next);
  }

  const status = winner ? `Winner: ${winner}` : isDraw ? 'Draw' : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <p aria-live="polite">{status}</p>
      <div className="grid">
        {board.map((cell, i) => (
          <button key={i} onClick={() => play(i)} aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ''}`}>
            {cell}
          </button>
        ))}
      </div>
      <button onClick={() => setBoard(Array(9).fill(null))}>Restart</button>
    </div>
  );
}
```

- The **only** state is the board. Whose turn it is, the winner, and draw are all **derived** — this is exactly what interviewers check.
- `getWinner` is a pure function, easy to unit test without React.

**Follow-ups:** undo / time travel (store an array of boards: `history`); an N×N board with K in a row; highlight the winning line.

---

# Quick Checklist Before You Say "Done"

```text
☐ Works for the main requirement
☐ Empty / loading / error states handled
☐ No mutation of state; stable keys
☐ Minimal state — everything else derived
☐ Effects have cleanups (timers, listeners, fetch abort)
☐ Real buttons, labels, keyboard works
☐ Edge cases: empty input, fast clicks, double submit
☐ Explain one or two improvements you'd make with more time
```
