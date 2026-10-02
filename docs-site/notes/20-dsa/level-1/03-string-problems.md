---
id: string-problems
title: "String Problems"
sidebar_label: "String Problems"
sidebar_position: 3
description: "String Problems — DSA interview notes."
---
### Reverse String

```javascript
// Method 1: Built-in reverse()
function reverse1(str) {
  return str.split('').reverse().join('');
}

// Method 2: Manual loop from the end
function reverse2(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Method 3: for...of, prepend each character
function reverse3(str) {
  let reversed = '';
  for (const char of str) {
    reversed = char + reversed;
  }
  return reversed;
}

console.log(reverse1('hello')); // "olleh"
```

```text
Method 3 (prepend):
char   reversed
h      "h"
e      "eh"
l      "leh"
l      "lleh"
o      "olleh"
```

**Note:** `split('')` breaks emoji into broken halves. Use `[...str].reverse().join('')` for Unicode-safe reversal.

**Time:** O(n) — **Space:** O(n)

---

### Check Palindrome String

```javascript
// Method 1: Reverse string
function isPalindromeReverse(str) {
  return str === str.split('').reverse().join('');
}

// Method 2: Two pointer (can exit early, no extra string)
function isPalindromeTwoPointer(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Method 3: Using every()
function isPalindromeEvery(str) {
  return str.split('').every((char, i) => char === str[str.length - 1 - i]);
}

console.log(isPalindromeTwoPointer('racecar')); // true

// With numbers
const num = 121;
console.log(String(num) === String(num).split('').reverse().join('')); // true
```

```text
 r   a   c   e   c   a   r
 L                       R    r == r ✓
     L               R        a == a ✓
         L       R            c == c ✓
             LR               L >= R → palindrome
```

**Time:** O(n) — **Space:** O(1) for two pointer

### Palindrome With Cleaning

Handles spaces, punctuation, and mixed case.

```javascript
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome('Racecar'));                       // true
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('hello'));                          // false
```

```text
"A man, a plan, a canal: Panama"
        │ toLowerCase + remove non a-z0-9
        ▼
"amanaplanacanalpanama"   → two pointer check → true
```

---

### First Non-Repeating Character

```javascript
// Method 1: Count, then scan (return the character)
function firstUniqueChar(str) {
  const count = {};
  for (const char of str) {
    count[char] = (count[char] || 0) + 1;
  }
  for (const char of str) {
    if (count[char] === 1) return char;
  }
  return null;
}
console.log(firstUniqueChar('swiss')); // "w"

// Method 2: indexOf === lastIndexOf — O(n²), shorter but slower
function firstUniqueCharShort(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) return str[i];
  }
  return null;
}

// Method 3: Return the index (LeetCode version)
function firstUniqChar(str) {
  const charCount = {};
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  for (let i = 0; i < str.length; i++) {
    if (charCount[str[i]] === 1) return i;
  }
  return -1;
}

console.log(firstUniqChar('leetcode'));     // 0  ('l')
console.log(firstUniqChar('loveleetcode')); // 2  ('v')
console.log(firstUniqChar('aabb'));         // -1 (none)
```

```text
str = "swiss"

Pass 1 — count          Pass 2 — scan in order
┌──────┬───────┐        s → 3 ✗
│ s    │ 3     │        w → 1 ✓  return "w"
│ w    │ 1     │
│ i    │ 1     │
└──────┴───────┘
```

**Time:** O(n) — **Space:** O(1), at most 26 letters (or the alphabet size)

Two passes are required — you cannot know a character is unique until the whole string is counted.

---

### Character Frequency Counter & Valid Anagram

Two strings are anagrams if they use the same characters the same number of times.

```javascript
function charFrequency(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}
console.log(charFrequency('hello')); // { h: 1, e: 1, l: 2, o: 1 }

function isAnagram(a, b) {
  if (a.length !== b.length) return false;

  const freq = {};
  for (const char of a) freq[char] = (freq[char] || 0) + 1;
  for (const char of b) {
    if (!freq[char]) return false; // missing or used up
    freq[char]--;
  }
  return true;
}

console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('rat', 'car'));       // false
```

```text
a = "listen"  → { l:1, i:1, s:1, t:1, e:1, n:1 }
b = "silent"  → subtract each char
                s → 0, i → 0, l → 0, e → 0, n → 0, t → 0
all zero      → true
```

**Time:** O(n) — **Space:** O(1) for a fixed alphabet

Shortcut: `[...a].sort().join('') === [...b].sort().join('')` — O(n log n).

---

### Group Anagrams

```javascript
function groupAnagrams(words) {
  const groups = new Map(); // sorted key => list of words

  for (const word of words) {
    const key = [...word].sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
```

```text
word   sorted key    groups
eat    aet           aet → [eat]
tea    aet           aet → [eat, tea]
tan    ant           ant → [tan]
ate    aet           aet → [eat, tea, ate]
nat    ant           ant → [tan, nat]
bat    abt           abt → [bat]
```

**Time:** O(n · k log k), where k is the longest word — **Space:** O(n · k)

---

### Longest Substring Without Repeating Characters (Sliding Window)

```javascript
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map(); // char => last index
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    // Repeat inside the current window → move left past it
    if (lastSeen.has(char) && lastSeen.get(char) >= left) {
      left = lastSeen.get(char) + 1;
    }
    lastSeen.set(char, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

console.log(lengthOfLongestSubstring('abcabcbb')); // 3 ("abc")
console.log(lengthOfLongestSubstring('bbbbb'));    // 1 ("b")
console.log(lengthOfLongestSubstring('pwwkew'));   // 3 ("wke")
```

```text
s = a b c a b c b b
    0 1 2 3 4 5 6 7

R=2  [a b c] a b c b b          window "abc"   best 3
R=3   a[b c a]b c b b           'a' repeats → L = 1
R=4   a b[c a b]c b b           'b' repeats → L = 2
R=5   a b c[a b c]b b           'c' repeats → L = 3
R=6   a b c a b[c b]b           'b' repeats → L = 5
R=7   a b c a b c b[b]          'b' repeats → L = 7
best = 3
```

**Time:** O(n) — **Space:** O(min(n, alphabet))

---

### Valid Parentheses (Stack)

Every opening bracket must be closed by the same type, in the right order.

```javascript
function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (stack.pop() !== pairs[char]) {
      return false;
    }
  }
  return stack.length === 0;
}

console.log(isValid('({[]})')); // true
console.log(isValid('([)]'));   // false
console.log(isValid('(('));     // false (left open)
```

```text
s = ( { [ ] } )

char   action           stack
(      push             (
{      push             ( {
[      push             ( { [
]      pop [ ✓          ( {
}      pop { ✓          (
)      pop ( ✓          (empty) → valid
```

**Time:** O(n) — **Space:** O(n)

---

### FizzBuzz

Print 1 to n. Multiples of 3 → "Fizz", of 5 → "Buzz", of both → "FizzBuzz".

```javascript
function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) console.log('FizzBuzz');
    else if (i % 3 === 0) console.log('Fizz');
    else if (i % 5 === 0) console.log('Buzz');
    else console.log(i);
  }
}

fizzBuzz(15);
```

```text
i      1  2  3     4  5     6     ...  15
out    1  2  Fizz  4  Buzz  Fizz  ...  FizzBuzz
```

Check 15 **first** — otherwise 15 matches `% 3` and prints "Fizz".

---
