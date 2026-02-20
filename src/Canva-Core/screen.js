import * as ReactJSXRuntime from 'react/jsx-runtime';
import * as React$1 from 'react';
import React__default$1, {
  forwardRef,
  useContext,
  useMemo,
  Fragment,
  useRef,
  useCallback,
  useEffect,
  useState,
  createElement,
} from 'react';
function sheetForTag(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function createStyleElement(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    void 0 !== e.nonce && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var StyleSheet = (function () {
    function e(e) {
      var r = this;
      (this._insertTag = function (e) {
        var t =
          0 === r.tags.length
            ? r.insertionPoint
              ? r.insertionPoint.nextSibling
              : r.prepend
              ? r.container.firstChild
              : r.before
            : r.tags[r.tags.length - 1].nextSibling;
        r.container.insertBefore(e, t), r.tags.push(e);
      }),
        (this.isSpeedy =
          void 0 === e.speedy
            ? 'production' === process.env.NODE_ENV
            : e.speedy),
        (this.tags = []),
        (this.ctr = 0),
        (this.nonce = e.nonce),
        (this.key = e.key),
        (this.container = e.container),
        (this.prepend = e.prepend),
        (this.insertionPoint = e.insertionPoint),
        (this.before = null);
    }
    var t = e.prototype;
    return (
      (t.hydrate = function (e) {
        e.forEach(this._insertTag);
      }),
      (t.insert = function (t) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 &&
          this._insertTag(createStyleElement(this));
        var e = this.tags[this.tags.length - 1];
        if (
          ('production' !== process.env.NODE_ENV &&
            ((r = 64 === t.charCodeAt(0) && 105 === t.charCodeAt(1)) &&
              this._alreadyInsertedOrderInsensitiveRule &&
              console.error(
                "You're attempting to insert the following rule:\n" +
                  t +
                  '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.'
              ),
            (this._alreadyInsertedOrderInsensitiveRule =
              this._alreadyInsertedOrderInsensitiveRule || !r)),
          this.isSpeedy)
        ) {
          var r = sheetForTag(e);
          try {
            r.insertRule(t, r.cssRules.length);
          } catch (e) {
            'production' === process.env.NODE_ENV ||
              /:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(
                t
              ) ||
              console.error(
                'There was a problem inserting the following rule: "' + t + '"',
                e
              );
          }
        } else e.appendChild(document.createTextNode(t));
        this.ctr++;
      }),
      (t.flush = function () {
        this.tags.forEach(function (e) {
          return e.parentNode && e.parentNode.removeChild(e);
        }),
          (this.tags = []),
          (this.ctr = 0),
          'production' !== process.env.NODE_ENV &&
            (this._alreadyInsertedOrderInsensitiveRule = !1);
      }),
      e
    );
  })(),
  MS = '-ms-',
  MOZ = '-moz-',
  WEBKIT = '-webkit-',
  COMMENT = 'comm',
  RULESET = 'rule',
  DECLARATION = 'decl',
  IMPORT = '@import',
  KEYFRAMES = '@keyframes',
  LAYER = '@layer',
  abs = Math.abs,
  from = String.fromCharCode,
  assign = Object.assign;
function hash(e, t) {
  return 45 ^ charat(e, 0)
    ? (((((((t << 2) ^ charat(e, 0)) << 2) ^ charat(e, 1)) << 2) ^
        charat(e, 2)) <<
        2) ^
        charat(e, 3)
    : 0;
}
function trim(e) {
  return e.trim();
}
function match(e, t) {
  return (e = t.exec(e)) && e[0];
}
function replace(e, t, r) {
  return e.replace(t, r);
}
function indexof(e, t) {
  return e.indexOf(t);
}
function charat(e, t) {
  return 0 | e.charCodeAt(t);
}
function substr(e, t, r) {
  return e.slice(t, r);
}
function strlen(e) {
  return e.length;
}
function sizeof(e) {
  return e.length;
}
function append(e, t) {
  return t.push(e), e;
}
function combine(e, t) {
  return e.map(t).join('');
}
var line = 1,
  column = 1,
  length = 0,
  position = 0,
  character = 0,
  characters = '';
function node(e, t, r, n, i, o, a) {
  return {
    value: e,
    root: t,
    parent: r,
    type: n,
    props: i,
    children: o,
    line: line,
    column: column,
    length: a,
    return: '',
  };
}
function copy(e, t) {
  return assign(
    node('', null, null, '', null, null, 0),
    e,
    { length: -e.length },
    t
  );
}
function char() {
  return character;
}
function prev() {
  return (
    (character = 0 < position ? charat(characters, --position) : 0),
    column--,
    10 === character && ((column = 1), line--),
    character
  );
}
function next() {
  return (
    (character = position < length ? charat(characters, position++) : 0),
    column++,
    10 === character && ((column = 1), line++),
    character
  );
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(e, t) {
  return substr(characters, e, t);
}
function token(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(e) {
  return (
    (line = column = 1), (length = strlen((characters = e))), (position = 0), []
  );
}
function dealloc(e) {
  return (characters = ''), e;
}
function delimit(e) {
  return trim(
    slice(position - 1, delimiter(91 === e ? e + 2 : 40 === e ? e + 1 : e))
  );
}
function whitespace(e) {
  for (; (character = peek()) && character < 33; ) next();
  return 2 < token(e) || 3 < token(character) ? '' : ' ';
}
function escaping(e, t) {
  for (
    ;
    --t &&
    next() &&
    !(
      character < 48 ||
      102 < character ||
      (57 < character && character < 65) ||
      (70 < character && character < 97)
    );

  );
  return slice(e, caret() + (t < 6 && 32 == peek() && 32 == next()));
}
function delimiter(e) {
  for (; next(); )
    switch (character) {
      case e:
        return position;
      case 34:
      case 39:
        34 !== e && 39 !== e && delimiter(character);
        break;
      case 40:
        41 === e && delimiter(e);
        break;
      case 92:
        next();
    }
  return position;
}
function commenter(e, t) {
  for (
    ;
    next() && e + character !== 57 && (e + character !== 84 || 47 !== peek());

  );
  return '/*' + slice(t, position - 1) + '*' + from(47 === e ? e : next());
}
function identifier(e) {
  for (; !token(peek()); ) next();
  return slice(e, position);
}
function compile(e) {
  return dealloc(parse('', null, null, null, [''], (e = alloc(e)), 0, [0], e));
}
function parse(e, t, r, n, i, o, a, s, u) {
  for (
    var c,
      l,
      f,
      p = 0,
      h = 0,
      d = a,
      m = 0,
      g = 0,
      b = 1,
      v = 1,
      y = 1,
      w = 0,
      _ = '',
      x = i,
      E = _;
    v;

  )
    switch (((c = w), (w = next()))) {
      case 40:
        if (108 != c && 58 == charat(E, d - 1)) {
          -1 != indexof((E += replace(delimit(w), '&', '&\f')), '&\f') &&
            (y = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        E += delimit(w);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        E += whitespace(c);
        break;
      case 92:
        E += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), t, r), u);
            break;
          default:
            E += '/';
        }
        break;
      case 123 * b:
        s[p++] = strlen(E) * y;
      case 125 * b:
      case 59:
      case 0:
        switch (w) {
          case 0:
          case 125:
            v = 0;
          case 59 + h:
            -1 == y && (E = replace(E, /\f/g, '')),
              0 < g &&
                strlen(E) - d &&
                append(
                  32 < g
                    ? declaration(E + ';', n, r, d - 1)
                    : declaration(replace(E, ' ', '') + ';', n, r, d - 2),
                  u
                );
            break;
          case 59:
            E += ';';
          default:
            if (
              (append(
                (f = ruleset(E, t, r, p, h, i, s, _, (x = []), (l = []), d)),
                o
              ),
              123 === w)
            )
              if (0 === h) parse(E, t, f, f, x, o, d, s, l);
              else
                switch (99 === m && 110 === charat(E, 3) ? 100 : m) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(
                      e,
                      f,
                      f,
                      n &&
                        append(
                          ruleset(e, f, f, 0, 0, i, s, _, i, (x = []), d),
                          l
                        ),
                      i,
                      l,
                      d,
                      s,
                      n ? x : l
                    );
                    break;
                  default:
                    parse(E, f, f, f, [''], l, 0, s, l);
                }
        }
        (p = h = g = 0), (b = y = 1), (_ = E = ''), (d = a);
        break;
      case 58:
        (d = 1 + strlen(E)), (g = c);
      default:
        if (b < 1)
          if (123 == w) --b;
          else if (125 == w && 0 == b++ && 125 == prev()) continue;
        switch (((E += from(w)), w * b)) {
          case 38:
            y = 0 < h ? 1 : ((E += '\f'), -1);
            break;
          case 44:
            (s[p++] = (strlen(E) - 1) * y), (y = 1);
            break;
          case 64:
            45 === peek() && (E += delimit(next())),
              (m = peek()),
              (h = d = strlen((_ = E += identifier(caret())))),
              w++;
            break;
          case 45:
            45 === c && 2 == strlen(E) && (b = 0);
        }
    }
  return o;
}
function ruleset(e, t, r, n, i, o, a, s, u, c, l) {
  for (
    var f, p = i - 1, h = 0 === i ? o : [''], d = sizeof(h), m = 0, g = 0;
    m < n;
    ++m
  )
    for (var b, v = 0, y = substr(e, p + 1, (p = abs((f = a[m])))); v < d; ++v)
      (b = trim(0 < f ? h[v] + ' ' + y : replace(y, /&\f/g, h[v]))) &&
        (u[g++] = b);
  return node(e, t, r, 0 === i ? RULESET : s, u, c, l);
}
function comment(e, t, r) {
  return node(e, t, r, COMMENT, from(char()), substr(e, 2, -2), 0);
}
function declaration(e, t, r, n) {
  return node(e, t, r, DECLARATION, substr(e, 0, n), substr(e, n + 1, -1), n);
}
function serialize(e, t) {
  for (var r = '', n = sizeof(e), i = 0; i < n; i++)
    r += t(e[i], i, e, t) || '';
  return r;
}
function stringify(e, t, r, n) {
  switch (e.type) {
    case LAYER:
      if (e.children.length) break;
    case IMPORT:
    case DECLARATION:
      return (e.return = e.return || e.value);
    case COMMENT:
      return '';
    case KEYFRAMES:
      return (e.return = e.value + '{' + serialize(e.children, n) + '}');
    case RULESET:
      e.value = e.props.join(',');
  }
  return strlen((r = serialize(e.children, n)))
    ? (e.return = e.value + '{' + r + '}')
    : '';
}
function middleware(a) {
  var s = sizeof(a);
  return function (e, t, r, n) {
    for (var i = '', o = 0; o < s; o++) i += a[o](e, t, r, n) || '';
    return i;
  };
}
function rulesheet(t) {
  return function (e) {
    e.root || ((e = e.return) && t(e));
  };
}
var weakMemoize = function (r) {
  var n = new WeakMap();
  return function (e) {
    var t;
    return n.has(e) ? n.get(e) : ((t = r(e)), n.set(e, t), t);
  };
};
function memoize(t) {
  var r = Object.create(null);
  return function (e) {
    return void 0 === r[e] && (r[e] = t(e)), r[e];
  };
}
var identifierWithPointTracking = function (e, t, r) {
    for (
      var n, i = 0;
      (n = i), (i = peek()), 38 === n && 12 === i && (t[r] = 1), !token(i);

    )
      next();
    return slice(e, position);
  },
  toRules = function (e, t) {
    var r = -1,
      n = 44;
    do {
      switch (token(n)) {
        case 0:
          38 === n && 12 === peek() && (t[r] = 1),
            (e[r] += identifierWithPointTracking(position - 1, t, r));
          break;
        case 2:
          e[r] += delimit(n);
          break;
        case 4:
          if (44 === n) {
            (e[++r] = 58 === peek() ? '&\f' : ''), (t[r] = e[r].length);
            break;
          }
        default:
          e[r] += from(n);
      }
    } while ((n = next()));
    return e;
  },
  getRules = function (e, t) {
    return dealloc(toRules(alloc(e), t));
  },
  fixedElements = new WeakMap(),
  compat = function (e) {
    if ('rule' === e.type && e.parent && !(e.length < 1)) {
      for (
        var t = e.value,
          r = e.parent,
          n = e.column === r.column && e.line === r.line;
        'rule' !== r.type;

      )
        if (!(r = r.parent)) return;
      if (
        (1 !== e.props.length ||
          58 === t.charCodeAt(0) ||
          fixedElements.get(r)) &&
        !n
      ) {
        fixedElements.set(e, !0);
        for (
          var i = [], o = getRules(t, i), a = r.props, s = 0, u = 0;
          s < o.length;
          s++
        )
          for (var c = 0; c < a.length; c++, u++)
            e.props[u] = i[s] ? o[s].replace(/&\f/g, a[c]) : a[c] + ' ' + o[s];
      }
    }
  },
  removeLabel = function (e) {
    var t;
    'decl' === e.type &&
      108 === (t = e.value).charCodeAt(0) &&
      98 === t.charCodeAt(2) &&
      ((e.return = ''), (e.value = ''));
  },
  ignoreFlag =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  isIgnoringComment = function (e) {
    return 'comm' === e.type && -1 < e.children.indexOf(ignoreFlag);
  },
  createUnsafeSelectorsAlarm = function (s) {
    return function (e, t, r) {
      if ('rule' === e.type && !s.compat) {
        var n = e.value.match(/(:first|:nth|:nth-last)-child/g);
        if (n) {
          for (
            var i = !!e.parent ? e.parent.children : r, o = i.length - 1;
            0 <= o;
            o--
          ) {
            var a = i[o];
            if (a.line < e.line) break;
            if (a.column < e.column) {
              if (isIgnoringComment(a)) return;
              break;
            }
          }
          n.forEach(function (e) {
            console.error(
              'The pseudo class "' +
                e +
                '" is potentially unsafe when doing server-side rendering. Try changing it to "' +
                e.split('-child')[0] +
                '-of-type".'
            );
          });
        }
      }
    };
  },
  isImportRule = function (e) {
    return 105 === e.type.charCodeAt(1) && 64 === e.type.charCodeAt(0);
  },
  isPrependedWithRegularRules = function (e, t) {
    for (var r = e - 1; 0 <= r; r--) if (!isImportRule(t[r])) return !0;
    return !1;
  },
  nullifyElement = function (e) {
    (e.type = ''),
      (e.value = ''),
      (e.return = ''),
      (e.children = ''),
      (e.props = '');
  },
  incorrectImportAlarm = function (e, t, r) {
    isImportRule(e) &&
      (e.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."
          ),
          nullifyElement(e))
        : isPrependedWithRegularRules(t, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."
          ),
          nullifyElement(e)));
  };
function prefix(e, t) {
  switch (hash(e, t)) {
    case 5103:
      return WEBKIT + 'print-' + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + e + MOZ + e + MS + e + e;
    case 6828:
    case 4268:
      return WEBKIT + e + MS + e + e;
    case 6165:
      return WEBKIT + e + MS + 'flex-' + e + e;
    case 5187:
      return (
        WEBKIT +
        e +
        replace(e, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') +
        e
      );
    case 5443:
      return WEBKIT + e + MS + 'flex-item-' + replace(e, /flex-|-self/, '') + e;
    case 4675:
      return (
        WEBKIT +
        e +
        MS +
        'flex-line-pack' +
        replace(e, /align-content|flex-|-self/, '') +
        e
      );
    case 5548:
      return WEBKIT + e + MS + replace(e, 'shrink', 'negative') + e;
    case 5292:
      return WEBKIT + e + MS + replace(e, 'basis', 'preferred-size') + e;
    case 6060:
      return (
        WEBKIT +
        'box-' +
        replace(e, '-grow', '') +
        WEBKIT +
        e +
        MS +
        replace(e, 'grow', 'positive') +
        e
      );
    case 4554:
      return (
        WEBKIT + replace(e, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + e
      );
    case 6187:
      return (
        replace(
          replace(
            replace(e, /(zoom-|grab)/, WEBKIT + '$1'),
            /(image-set)/,
            WEBKIT + '$1'
          ),
          e,
          ''
        ) + e
      );
    case 5495:
    case 3959:
      return replace(e, /(image-set\([^]*)/, WEBKIT + '$1$`$1');
    case 4968:
      return (
        replace(
          replace(
            e,
            /(.+:)(flex-)?(.*)/,
            WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'
          ),
          /s.+-b[^;]+/,
          'justify'
        ) +
        WEBKIT +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(e, /(.+)-inline(.+)/, WEBKIT + '$1$2') + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (6 < strlen(e) - 1 - t)
        switch (charat(e, t + 1)) {
          case 109:
            if (45 !== charat(e, t + 4)) break;
          case 102:
            return (
              replace(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' +
                  WEBKIT +
                  '$2-$3$1' +
                  MOZ +
                  (108 == charat(e, t + 3) ? '$3' : '$2-$3')
              ) + e
            );
          case 115:
            return ~indexof(e, 'stretch')
              ? prefix(replace(e, 'stretch', 'fill-available'), t) + e
              : e;
        }
      break;
    case 4949:
      if (115 !== charat(e, t + 1)) break;
    case 6444:
      switch (charat(e, strlen(e) - 3 - (~indexof(e, '!important') && 10))) {
        case 107:
          return replace(e, ':', ':' + WEBKIT) + e;
        case 101:
          return (
            replace(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                WEBKIT +
                (45 === charat(e, 14) ? 'inline-' : '') +
                'box$3$1' +
                WEBKIT +
                '$2$3$1' +
                MS +
                '$2box$3'
            ) + e
          );
      }
      break;
    case 5936:
      switch (charat(e, t + 11)) {
        case 114:
          return WEBKIT + e + MS + replace(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return (
            WEBKIT + e + MS + replace(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e
          );
        case 45:
          return WEBKIT + e + MS + replace(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return WEBKIT + e + MS + e + e;
  }
  return e;
}
var hasRequiredReactIs_production_min,
  prefixer = function (t, e, r, n) {
    if (-1 < t.length && !t.return)
      switch (t.type) {
        case DECLARATION:
          t.return = prefix(t.value, t.length);
          break;
        case KEYFRAMES:
          return serialize(
            [copy(t, { value: replace(t.value, '@', '@' + WEBKIT) })],
            n
          );
        case RULESET:
          if (t.length)
            return combine(t.props, function (e) {
              switch (match(e, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return serialize(
                    [
                      copy(t, {
                        props: [replace(e, /:(read-\w+)/, ':' + MOZ + '$1')],
                      }),
                    ],
                    n
                  );
                case '::placeholder':
                  return serialize(
                    [
                      copy(t, {
                        props: [
                          replace(e, /:(plac\w+)/, ':' + WEBKIT + 'input-$1'),
                        ],
                      }),
                      copy(t, {
                        props: [replace(e, /:(plac\w+)/, ':' + MOZ + '$1')],
                      }),
                      copy(t, {
                        props: [replace(e, /:(plac\w+)/, MS + 'input-$1')],
                      }),
                    ],
                    n
                  );
              }
              return '';
            });
      }
  },
  isBrowser$5 = 'undefined' != typeof document,
  getServerStylisCache = isBrowser$5
    ? void 0
    : weakMemoize(function () {
        return memoize(function () {
          var t = {};
          return function (e) {
            return t[e];
          };
        });
      }),
  defaultStylisPlugins = [prefixer],
  createCache = function (e) {
    var t = e.key;
    if ('production' !== process.env.NODE_ENV && !t)
      throw new Error(
        "You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements."
      );
    isBrowser$5 &&
      'css' === t &&
      ((r = document.querySelectorAll('style[data-emotion]:not([data-s])')),
      Array.prototype.forEach.call(r, function (e) {
        -1 !== e.getAttribute('data-emotion').indexOf(' ') &&
          (document.head.appendChild(e), e.setAttribute('data-s', ''));
      }));
    var r = e.stylisPlugins || defaultStylisPlugins;
    if ('production' !== process.env.NODE_ENV && /[^a-z-]/.test(t))
      throw new Error(
        'Emotion key must only contain lower case alphabetical characters and - but "' +
          t +
          '" was passed'
      );
    var n,
      i,
      o,
      a,
      s,
      u,
      c,
      l = {},
      f = [],
      p =
        (isBrowser$5 &&
          ((n = e.container || document.head),
          Array.prototype.forEach.call(
            document.querySelectorAll('style[data-emotion^="' + t + ' "]'),
            function (e) {
              for (
                var t = e.getAttribute('data-emotion').split(' '), r = 1;
                r < t.length;
                r++
              )
                l[t[r]] = !0;
              f.push(e);
            }
          )),
        [compat, removeLabel]),
      h =
        ('production' !== process.env.NODE_ENV &&
          p.push(
            createUnsafeSelectorsAlarm({
              get compat() {
                return h.compat;
              },
            }),
            incorrectImportAlarm
          ),
        (a = isBrowser$5
          ? ((a = [
              stringify,
              'production' !== process.env.NODE_ENV
                ? function (e) {
                    e.root ||
                      (e.return
                        ? i.insert(e.return)
                        : e.value &&
                          e.type !== COMMENT &&
                          i.insert(e.value + '{}'));
                  }
                : rulesheet(function (e) {
                    i.insert(e);
                  }),
            ]),
            (o = middleware(p.concat(r, a))),
            function (e, t, r, n) {
              (i = r),
                'production' !== process.env.NODE_ENV &&
                  void 0 !== t.map &&
                  (i = {
                    insert: function (e) {
                      r.insert(e + t.map);
                    },
                  }),
                serialize(compile(e ? e + '{' + t.styles + '}' : t.styles), o),
                n && (h.inserted[t.name] = !0);
            })
          : ((s = middleware(p.concat(r, [stringify]))),
            (u = function (e) {
              return serialize(compile(e), s);
            }),
            (c = getServerStylisCache(r)(t)),
            function (e, t, r, n) {
              var i,
                o,
                a = t.name,
                e =
                  ((e = e),
                  (o = (i = t).name),
                  void 0 === c[o] &&
                    (c[o] = u(e ? e + '{' + i.styles + '}' : i.styles)),
                  c[o]);
              return void 0 === h.compat
                ? (n && (h.inserted[a] = !0),
                  'development' === process.env.NODE_ENV && void 0 !== t.map
                    ? e + t.map
                    : e)
                : n
                ? void (h.inserted[a] = e)
                : e;
            })),
        {
          key: t,
          sheet: new StyleSheet({
            key: t,
            container: n,
            nonce: e.nonce,
            speedy: e.speedy,
            prepend: e.prepend,
            insertionPoint: e.insertionPoint,
          }),
          nonce: e.nonce,
          inserted: l,
          registered: {},
          insert: a,
        });
    return h.sheet.hydrate(f), h;
  },
  commonjsGlobal =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : {},
  reactIs$1 = { exports: {} },
  reactIs_production_min = {};
function requireReactIs_production_min() {
  var e, r, n, i, o, a, s, u, c, l, f, p, t, h, d, m, g, b, v;
  return (
    hasRequiredReactIs_production_min ||
      ((hasRequiredReactIs_production_min = 1),
      (e = 'function' == typeof Symbol && Symbol.for),
      (r = e ? Symbol.for('react.element') : 60103),
      (n = e ? Symbol.for('react.portal') : 60106),
      (i = e ? Symbol.for('react.fragment') : 60107),
      (o = e ? Symbol.for('react.strict_mode') : 60108),
      (a = e ? Symbol.for('react.profiler') : 60114),
      (s = e ? Symbol.for('react.provider') : 60109),
      (u = e ? Symbol.for('react.context') : 60110),
      (c = e ? Symbol.for('react.async_mode') : 60111),
      (l = e ? Symbol.for('react.concurrent_mode') : 60111),
      (f = e ? Symbol.for('react.forward_ref') : 60112),
      (p = e ? Symbol.for('react.suspense') : 60113),
      (t = e ? Symbol.for('react.suspense_list') : 60120),
      (h = e ? Symbol.for('react.memo') : 60115),
      (d = e ? Symbol.for('react.lazy') : 60116),
      (m = e ? Symbol.for('react.block') : 60121),
      (g = e ? Symbol.for('react.fundamental') : 60117),
      (b = e ? Symbol.for('react.responder') : 60118),
      (v = e ? Symbol.for('react.scope') : 60119),
      (reactIs_production_min.AsyncMode = c),
      (reactIs_production_min.ConcurrentMode = l),
      (reactIs_production_min.ContextConsumer = u),
      (reactIs_production_min.ContextProvider = s),
      (reactIs_production_min.Element = r),
      (reactIs_production_min.ForwardRef = f),
      (reactIs_production_min.Fragment = i),
      (reactIs_production_min.Lazy = d),
      (reactIs_production_min.Memo = h),
      (reactIs_production_min.Portal = n),
      (reactIs_production_min.Profiler = a),
      (reactIs_production_min.StrictMode = o),
      (reactIs_production_min.Suspense = p),
      (reactIs_production_min.isAsyncMode = function (e) {
        return w(e) || y(e) === c;
      }),
      (reactIs_production_min.isConcurrentMode = w),
      (reactIs_production_min.isContextConsumer = function (e) {
        return y(e) === u;
      }),
      (reactIs_production_min.isContextProvider = function (e) {
        return y(e) === s;
      }),
      (reactIs_production_min.isElement = function (e) {
        return 'object' == typeof e && null !== e && e.$$typeof === r;
      }),
      (reactIs_production_min.isForwardRef = function (e) {
        return y(e) === f;
      }),
      (reactIs_production_min.isFragment = function (e) {
        return y(e) === i;
      }),
      (reactIs_production_min.isLazy = function (e) {
        return y(e) === d;
      }),
      (reactIs_production_min.isMemo = function (e) {
        return y(e) === h;
      }),
      (reactIs_production_min.isPortal = function (e) {
        return y(e) === n;
      }),
      (reactIs_production_min.isProfiler = function (e) {
        return y(e) === a;
      }),
      (reactIs_production_min.isStrictMode = function (e) {
        return y(e) === o;
      }),
      (reactIs_production_min.isSuspense = function (e) {
        return y(e) === p;
      }),
      (reactIs_production_min.isValidElementType = function (e) {
        return (
          'string' == typeof e ||
          'function' == typeof e ||
          e === i ||
          e === l ||
          e === a ||
          e === o ||
          e === p ||
          e === t ||
          ('object' == typeof e &&
            null !== e &&
            (e.$$typeof === d ||
              e.$$typeof === h ||
              e.$$typeof === s ||
              e.$$typeof === u ||
              e.$$typeof === f ||
              e.$$typeof === g ||
              e.$$typeof === b ||
              e.$$typeof === v ||
              e.$$typeof === m))
        );
      }),
      (reactIs_production_min.typeOf = y)),
    reactIs_production_min
  );
  function y(e) {
    if ('object' == typeof e && null !== e) {
      var t = e.$$typeof;
      switch (t) {
        case r:
          switch ((e = e.type)) {
            case c:
            case l:
            case i:
            case a:
            case o:
            case p:
              return e;
            default:
              switch ((e = e && e.$$typeof)) {
                case u:
                case f:
                case d:
                case h:
                case s:
                  return e;
                default:
                  return t;
              }
          }
        case n:
          return t;
      }
    }
  }
  function w(e) {
    return y(e) === l;
  }
}
var hasRequiredReactIs_development,
  reactIs_development = {};
function requireReactIs_development() {
  var e,
    i,
    o,
    a,
    s,
    u,
    c,
    l,
    f,
    p,
    h,
    d,
    t,
    m,
    g,
    r,
    n,
    b,
    v,
    y,
    w,
    _,
    x,
    E,
    S,
    I,
    T,
    O,
    N,
    C,
    $;
  return (
    hasRequiredReactIs_development ||
      ((hasRequiredReactIs_development = 1),
      'production' !== process.env.NODE_ENV &&
        ((e = 'function' == typeof Symbol && Symbol.for),
        (i = e ? Symbol.for('react.element') : 60103),
        (o = e ? Symbol.for('react.portal') : 60106),
        (a = e ? Symbol.for('react.fragment') : 60107),
        (s = e ? Symbol.for('react.strict_mode') : 60108),
        (u = e ? Symbol.for('react.profiler') : 60114),
        (c = e ? Symbol.for('react.provider') : 60109),
        (l = e ? Symbol.for('react.context') : 60110),
        (f = e ? Symbol.for('react.async_mode') : 60111),
        (p = e ? Symbol.for('react.concurrent_mode') : 60111),
        (h = e ? Symbol.for('react.forward_ref') : 60112),
        (d = e ? Symbol.for('react.suspense') : 60113),
        (t = e ? Symbol.for('react.suspense_list') : 60120),
        (m = e ? Symbol.for('react.memo') : 60115),
        (g = e ? Symbol.for('react.lazy') : 60116),
        (r = e ? Symbol.for('react.block') : 60121),
        (n = e ? Symbol.for('react.fundamental') : 60117),
        (b = e ? Symbol.for('react.responder') : 60118),
        (v = e ? Symbol.for('react.scope') : 60119),
        (e = p),
        (y = l),
        (w = c),
        (_ = i),
        (x = h),
        (E = a),
        (S = g),
        (I = m),
        (T = o),
        (O = u),
        (N = s),
        (C = d),
        ($ = !1),
        (reactIs_development.AsyncMode = f),
        (reactIs_development.ConcurrentMode = e),
        (reactIs_development.ContextConsumer = y),
        (reactIs_development.ContextProvider = w),
        (reactIs_development.Element = _),
        (reactIs_development.ForwardRef = x),
        (reactIs_development.Fragment = E),
        (reactIs_development.Lazy = S),
        (reactIs_development.Memo = I),
        (reactIs_development.Portal = T),
        (reactIs_development.Profiler = O),
        (reactIs_development.StrictMode = N),
        (reactIs_development.Suspense = C),
        (reactIs_development.isAsyncMode = function (e) {
          return (
            $ ||
              (($ = !0),
              console.warn(
                'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.'
              )),
            k(e) || j(e) === f
          );
        }),
        (reactIs_development.isConcurrentMode = k),
        (reactIs_development.isContextConsumer = function (e) {
          return j(e) === l;
        }),
        (reactIs_development.isContextProvider = function (e) {
          return j(e) === c;
        }),
        (reactIs_development.isElement = function (e) {
          return 'object' == typeof e && null !== e && e.$$typeof === i;
        }),
        (reactIs_development.isForwardRef = function (e) {
          return j(e) === h;
        }),
        (reactIs_development.isFragment = function (e) {
          return j(e) === a;
        }),
        (reactIs_development.isLazy = function (e) {
          return j(e) === g;
        }),
        (reactIs_development.isMemo = function (e) {
          return j(e) === m;
        }),
        (reactIs_development.isPortal = function (e) {
          return j(e) === o;
        }),
        (reactIs_development.isProfiler = function (e) {
          return j(e) === u;
        }),
        (reactIs_development.isStrictMode = function (e) {
          return j(e) === s;
        }),
        (reactIs_development.isSuspense = function (e) {
          return j(e) === d;
        }),
        (reactIs_development.isValidElementType = function (e) {
          return (
            'string' == typeof e ||
            'function' == typeof e ||
            e === a ||
            e === p ||
            e === u ||
            e === s ||
            e === d ||
            e === t ||
            ('object' == typeof e &&
              null !== e &&
              (e.$$typeof === g ||
                e.$$typeof === m ||
                e.$$typeof === c ||
                e.$$typeof === l ||
                e.$$typeof === h ||
                e.$$typeof === n ||
                e.$$typeof === b ||
                e.$$typeof === v ||
                e.$$typeof === r))
          );
        }),
        (reactIs_development.typeOf = j))),
    reactIs_development
  );
  function j(e) {
    if ('object' == typeof e && null !== e) {
      var t = e.$$typeof;
      switch (t) {
        case i:
          var r = e.type;
          switch (r) {
            case f:
            case p:
            case a:
            case u:
            case s:
            case d:
              return r;
            default:
              var n = r && r.$$typeof;
              switch (n) {
                case l:
                case h:
                case g:
                case m:
                case c:
                  return n;
                default:
                  return t;
              }
          }
        case o:
          return t;
      }
    }
  }
  function k(e) {
    return j(e) === p;
  }
}
'production' === process.env.NODE_ENV
  ? (reactIs$1.exports = requireReactIs_production_min())
  : (reactIs$1.exports = requireReactIs_development());
var reactIsExports = reactIs$1.exports,
  reactIs = reactIsExports,
  FORWARD_REF_STATICS = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  MEMO_STATICS = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  TYPE_STATICS = {},
  isBrowser$4 =
    ((TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS),
    (TYPE_STATICS[reactIs.Memo] = MEMO_STATICS),
    'undefined' != typeof document);
function getRegisteredStyles(t, r, e) {
  var n = '';
  return (
    e.split(' ').forEach(function (e) {
      void 0 !== t[e] ? r.push(t[e] + ';') : (n += e + ' ');
    }),
    n
  );
}
var registerStyles = function (e, t, r) {
    var n = e.key + '-' + t.name;
    (!1 === r || (!1 === isBrowser$4 && void 0 !== e.compat)) &&
      void 0 === e.registered[n] &&
      (e.registered[n] = t.styles);
  },
  insertStyles = function (e, t, r) {
    registerStyles(e, t, r);
    var n = e.key + '-' + t.name;
    if (void 0 === e.inserted[t.name]) {
      var i = '',
        o = t;
      do {
        var a = e.insert(t === o ? '.' + n : '', o, e.sheet, !0);
      } while (
        (isBrowser$4 || void 0 === a || (i += a), void 0 !== (o = o.next))
      );
      if (!isBrowser$4 && 0 !== i.length) return i;
    }
  };
function murmur2(e) {
  for (var t, r = 0, n = 0, i = e.length; 4 <= i; ++n, i -= 4)
    (t =
      1540483477 *
        (65535 &
          (t =
            (255 & e.charCodeAt(n)) |
            ((255 & e.charCodeAt(++n)) << 8) |
            ((255 & e.charCodeAt(++n)) << 16) |
            ((255 & e.charCodeAt(++n)) << 24))) +
      ((59797 * (t >>> 16)) << 16)),
      (r =
        (1540483477 * (65535 & (t ^= t >>> 24)) +
          ((59797 * (t >>> 16)) << 16)) ^
        (1540483477 * (65535 & r) + ((59797 * (r >>> 16)) << 16)));
  switch (i) {
    case 3:
      r ^= (255 & e.charCodeAt(n + 2)) << 16;
    case 2:
      r ^= (255 & e.charCodeAt(n + 1)) << 8;
    case 1:
      r =
        1540483477 * (65535 & (r ^= 255 & e.charCodeAt(n))) +
        ((59797 * (r >>> 16)) << 16);
  }
  return (
    ((r =
      1540483477 * (65535 & (r ^= r >>> 13)) + ((59797 * (r >>> 16)) << 16)) ^
      (r >>> 15)) >>>
    0
  ).toString(36);
}
var contentValuePattern,
  contentValues,
  oldProcessStyleValue,
  msPattern,
  hyphenPattern,
  hyphenatedCache,
  unitlessKeys = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  ILLEGAL_ESCAPE_SEQUENCE_ERROR =
    "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
  UNDEFINED_AS_OBJECT_KEY_ERROR =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  hyphenateRegex = /[A-Z]|^ms/g,
  animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  isCustomProperty = function (e) {
    return 45 === e.charCodeAt(1);
  },
  isProcessableValue = function (e) {
    return null != e && 'boolean' != typeof e;
  },
  processStyleName = memoize(function (e) {
    return isCustomProperty(e)
      ? e
      : e.replace(hyphenateRegex, '-$&').toLowerCase();
  }),
  processStyleValue = function (e, t) {
    switch (e) {
      case 'animation':
      case 'animationName':
        if ('string' == typeof t)
          return t.replace(animationRegex, function (e, t, r) {
            return (cursor = { name: t, styles: r, next: cursor }), t;
          });
    }
    return 1 === unitlessKeys[e] ||
      isCustomProperty(e) ||
      'number' != typeof t ||
      0 === t
      ? t
      : t + 'px';
  },
  noComponentSelectorMessage =
    ('production' !== process.env.NODE_ENV &&
      ((contentValuePattern =
        /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/),
      (contentValues = ['normal', 'none', 'initial', 'inherit', 'unset']),
      (oldProcessStyleValue = processStyleValue),
      (msPattern = /^-ms-/),
      (hyphenPattern = /-(.)/g),
      (hyphenatedCache = {}),
      (processStyleValue = function (e, t) {
        var r;
        if (
          'content' !== e ||
          ('string' == typeof t &&
            (-1 !== contentValues.indexOf(t) ||
              contentValuePattern.test(t) ||
              (t.charAt(0) === t.charAt(t.length - 1) &&
                ('"' === t.charAt(0) || "'" === t.charAt(0)))))
        )
          return (
            '' === (r = oldProcessStyleValue(e, t)) ||
              isCustomProperty(e) ||
              -1 === e.indexOf('-') ||
              void 0 !== hyphenatedCache[e] ||
              ((hyphenatedCache[e] = !0),
              console.error(
                'Using kebab-case for css properties in objects is not supported. Did you mean ' +
                  e
                    .replace(msPattern, 'ms-')
                    .replace(hyphenPattern, function (e, t) {
                      return t.toUpperCase();
                    }) +
                  '?'
              )),
            r
          );
        throw new Error(
          "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
            t +
            '"\'`'
        );
      })),
    'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.');
function handleInterpolation(e, t, r) {
  if (null == r) return '';
  if (void 0 !== r.__emotion_styles) {
    if (
      'production' !== process.env.NODE_ENV &&
      'NO_COMPONENT_SELECTOR' === r.toString()
    )
      throw new Error(noComponentSelectorMessage);
    return r;
  }
  switch (typeof r) {
    case 'boolean':
      return '';
    case 'object':
      if (1 === r.anim)
        return (
          (cursor = { name: r.name, styles: r.styles, next: cursor }), r.name
        );
      if (void 0 === r.styles) return createStringFromObject(e, t, r);
      var n = r.next;
      if (void 0 !== n)
        for (; void 0 !== n; )
          (cursor = { name: n.name, styles: n.styles, next: cursor }),
            (n = n.next);
      var i = r.styles + ';';
      return (
        'production' !== process.env.NODE_ENV &&
          void 0 !== r.map &&
          (i += r.map),
        i
      );
    case 'function':
      var o;
      if (void 0 !== e)
        return (
          (i = cursor), (o = r(e)), (cursor = i), handleInterpolation(e, t, o)
        );
      'production' !== process.env.NODE_ENV &&
        console.error(
          "Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`"
        );
      break;
    case 'string':
      var a;
      'production' !== process.env.NODE_ENV &&
        ((a = []),
        (i = r.replace(animationRegex, function (e, t, r) {
          var n = 'animation' + a.length;
          return (
            a.push(
              'const ' +
                n +
                ' = keyframes`' +
                r.replace(/^@keyframes animation-\w+/, '') +
                '`'
            ),
            '${' + n + '}'
          );
        })),
        a.length) &&
        console.error(
          '`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n' +
            [].concat(a, ['`' + i + '`']).join('\n') +
            '\n\nYou should wrap it with `css` like this:\n\ncss`' +
            i +
            '`'
        );
  }
  var s;
  return null != t && void 0 !== (s = t[r]) ? s : r;
}
function createStringFromObject(e, t, r) {
  var n = '';
  if (Array.isArray(r))
    for (var i = 0; i < r.length; i++)
      n += handleInterpolation(e, t, r[i]) + ';';
  else
    for (var o in r) {
      var a = r[o];
      if ('object' != typeof a)
        null != t && void 0 !== t[a]
          ? (n += o + '{' + t[a] + '}')
          : isProcessableValue(a) &&
            (n += processStyleName(o) + ':' + processStyleValue(o, a) + ';');
      else {
        if (
          'NO_COMPONENT_SELECTOR' === o &&
          'production' !== process.env.NODE_ENV
        )
          throw new Error(noComponentSelectorMessage);
        if (
          !Array.isArray(a) ||
          'string' != typeof a[0] ||
          (null != t && void 0 !== t[a[0]])
        ) {
          var s = handleInterpolation(e, t, a);
          switch (o) {
            case 'animation':
            case 'animationName':
              n += processStyleName(o) + ':' + s + ';';
              break;
            default:
              'production' !== process.env.NODE_ENV &&
                'undefined' === o &&
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR),
                (n += o + '{' + s + '}');
          }
        } else
          for (var u = 0; u < a.length; u++)
            isProcessableValue(a[u]) &&
              (n +=
                processStyleName(o) + ':' + processStyleValue(o, a[u]) + ';');
      }
    }
  return n;
}
var sourceMapPattern,
  cursor,
  labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  serializeStyles =
    ('production' !== process.env.NODE_ENV &&
      (sourceMapPattern =
        /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g),
    function (e, t, r) {
      if (
        1 === e.length &&
        'object' == typeof e[0] &&
        null !== e[0] &&
        void 0 !== e[0].styles
      )
        return e[0];
      var n = !0,
        i = '',
        o = ((cursor = void 0), e[0]);
      null == o || void 0 === o.raw
        ? ((n = !1), (i += handleInterpolation(r, t, o)))
        : ('production' !== process.env.NODE_ENV &&
            void 0 === o[0] &&
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR),
          (i += o[0]));
      for (var a, s = 1; s < e.length; s++)
        (i += handleInterpolation(r, t, e[s])),
          n &&
            ('production' !== process.env.NODE_ENV &&
              void 0 === o[s] &&
              console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR),
            (i += o[s]));
      'production' !== process.env.NODE_ENV &&
        (i = i.replace(sourceMapPattern, function (e) {
          return (a = e), '';
        })),
        (labelPattern.lastIndex = 0);
      for (var u, c = ''; null !== (u = labelPattern.exec(i)); )
        c += '-' + u[1];
      var l = murmur2(i) + c;
      return 'production' !== process.env.NODE_ENV
        ? {
            name: l,
            styles: i,
            map: a,
            next: cursor,
            toString: function () {
              return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
            },
          }
        : { name: l, styles: i, next: cursor };
    }),
  isBrowser$3 = 'undefined' != typeof document,
  syncFallback = function (e) {
    return e();
  },
  useInsertionEffect = React$1.useInsertionEffect || !1,
  useInsertionEffectAlwaysWithSyncFallback =
    (isBrowser$3 && useInsertionEffect) || syncFallback,
  useInsertionEffectWithLayoutFallback =
    useInsertionEffect || React$1.useLayoutEffect,
  isBrowser$2 = 'undefined' != typeof document,
  hasOwnProperty = {}.hasOwnProperty,
  EmotionCacheContext = React$1.createContext(
    'undefined' != typeof HTMLElement ? createCache({ key: 'css' }) : null
  ),
  withEmotionCache =
    ('production' !== process.env.NODE_ENV &&
      (EmotionCacheContext.displayName = 'EmotionCacheContext'),
    EmotionCacheContext.Provider,
    function (n) {
      return forwardRef(function (e, t) {
        var r = useContext(EmotionCacheContext);
        return n(e, r, t);
      });
    }),
  ThemeContext =
    (isBrowser$2 ||
      (withEmotionCache = function (r) {
        return function (e) {
          var t = useContext(EmotionCacheContext);
          return null === t
            ? ((t = createCache({ key: 'css' })),
              React$1.createElement(
                EmotionCacheContext.Provider,
                { value: t },
                r(e, t)
              ))
            : r(e, t);
        };
      }),
    React$1.createContext({})),
  getLastPart =
    ('production' !== process.env.NODE_ENV &&
      (ThemeContext.displayName = 'EmotionThemeContext'),
    function (e) {
      e = e.split('.');
      return e[e.length - 1];
    }),
  getFunctionNameFromStackTraceLine = function (e) {
    var t = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(e);
    return (t = t || /^([A-Za-z0-9$.]+)@/.exec(e)) ? getLastPart(t[1]) : void 0;
  },
  internalReactFunctionNames = new Set([
    'renderWithHooks',
    'processChild',
    'finishClassComponent',
    'renderToString',
  ]),
  sanitizeIdentifier = function (e) {
    return e.replace(/\$/g, '-');
  },
  getLabelFromStackTrace = function (e) {
    if (e)
      for (var t = e.split('\n'), r = 0; r < t.length; r++) {
        var n = getFunctionNameFromStackTraceLine(t[r]);
        if (n) {
          if (internalReactFunctionNames.has(n)) break;
          if (/^[A-Z]/.test(n)) return sanitizeIdentifier(n);
        }
      }
  },
  typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  createEmotionProps = function (e, t) {
    if (
      'production' !== process.env.NODE_ENV &&
      'string' == typeof t.css &&
      -1 !== t.css.indexOf(':')
    )
      throw new Error(
        "Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" +
          t.css +
          '`'
      );
    var r,
      n = {};
    for (r in t) hasOwnProperty.call(t, r) && (n[r] = t[r]);
    return (
      (n[typePropName] = e),
      'production' === process.env.NODE_ENV ||
        !t.css ||
        ('object' == typeof t.css &&
          'string' == typeof t.css.name &&
          -1 !== t.css.name.indexOf('-')) ||
        ((e = getLabelFromStackTrace(new Error().stack)) &&
          (n[labelPropName] = e)),
      n
    );
  },
  Insertion$1 = function (e) {
    var t = e.cache,
      r = e.serialized,
      n = e.isStringTag,
      e =
        (registerStyles(t, r, n),
        useInsertionEffectAlwaysWithSyncFallback(function () {
          return insertStyles(t, r, n);
        }));
    if (isBrowser$2 || void 0 === e) return null;
    for (var i, o = r.name, a = r.next; void 0 !== a; )
      (o += ' ' + a.name), (a = a.next);
    return React$1.createElement(
      'style',
      (((i = {})['data-emotion'] = t.key + ' ' + o),
      (i.dangerouslySetInnerHTML = { __html: e }),
      (i.nonce = t.sheet.nonce),
      i)
    );
  },
  Emotion = withEmotionCache(function (e, t, r) {
    var n,
      i,
      o = e.css,
      a =
        ('string' == typeof o &&
          void 0 !== t.registered[o] &&
          (o = t.registered[o]),
        e[typePropName]),
      o = [o],
      s = '',
      o =
        ('string' == typeof e.className
          ? (s = getRegisteredStyles(t.registered, o, e.className))
          : null != e.className && (s = e.className + ' '),
        serializeStyles(o, void 0, React$1.useContext(ThemeContext))),
      u =
        ('production' !== process.env.NODE_ENV &&
          -1 === o.name.indexOf('-') &&
          (n = e[labelPropName]) &&
          (o = serializeStyles([o, 'label:' + n + ';'])),
        (s += t.key + '-' + o.name),
        {});
    for (i in e)
      !hasOwnProperty.call(e, i) ||
        'css' === i ||
        i === typePropName ||
        ('production' !== process.env.NODE_ENV && i === labelPropName) ||
        (u[i] = e[i]);
    return (
      (u.ref = r),
      (u.className = s),
      React$1.createElement(
        React$1.Fragment,
        null,
        React$1.createElement(Insertion$1, {
          cache: t,
          serialized: o,
          isStringTag: 'string' == typeof a,
        }),
        React$1.createElement(a, u)
      )
    );
  }),
  Emotion$1 =
    ('production' !== process.env.NODE_ENV &&
      (Emotion.displayName = 'EmotionCssPropInternal'),
    Emotion);
function jsx(e, t, r) {
  return hasOwnProperty.call(t, 'css')
    ? ReactJSXRuntime.jsx(Emotion$1, createEmotionProps(e, t), r)
    : ReactJSXRuntime.jsx(e, t, r);
}
function jsxs(e, t, r) {
  return hasOwnProperty.call(t, 'css')
    ? ReactJSXRuntime.jsxs(Emotion$1, createEmotionProps(e, t), r)
    : ReactJSXRuntime.jsxs(e, t, r);
}
const normalizeNumber = (e) =>
    0 < e % 1 && e % 1 < 0.5 ? Math.round(e) : Math.round(1e3 * e) / 1e3,
  getCirclePath = ({ width: e, height: t }) => {
    var r = (4 * (Math.sqrt(2) - 1)) / 3,
      n = normalizeNumber(e / 2),
      i = normalizeNumber(t / 2),
      o = normalizeNumber(e * r),
      r = normalizeNumber(t * r),
      o = normalizeNumber((e - o) / 2),
      r = normalizeNumber((t - r) / 2),
      a = [`M ${n} 0`];
    return (
      a.push(`C ${e - o} 0 ${e} ${r} ${e} ` + i),
      a.push(`C ${e} ${t - r} ${e - o} ${t} ${n} ` + t),
      a.push(`C ${o} ${t} 0 ${t - r} 0 ` + i),
      a.push(`C 0 ${r} ${o} 0 ${n} 0`),
      a.join(' ')
    );
  },
  getRectanglePath = ({ width: e, height: t, roundedCorners: r }) => {
    var n = 0.005 * Math.min(e, t),
      n = normalizeNumber(Math.min(Math.min(e / 2, n * r), t / 2)),
      i = (4 * (Math.sqrt(2) - 1)) / 3,
      i = normalizeNumber(n * (1 - i)),
      o = [`M ${n} 0`];
    return (
      o.push(`L ${normalizeNumber(e) - n} 0`),
      r &&
        o.push(
          `C ${normalizeNumber(e) - i} 0 ${normalizeNumber(
            e
          )} ${i} ${normalizeNumber(e)} ` + n
        ),
      o.push(`L ${normalizeNumber(e)} ` + (normalizeNumber(t) - n)),
      r &&
        o.push(
          `C ${normalizeNumber(e)} ${normalizeNumber(t) - i} ${
            normalizeNumber(e) - i
          } ${normalizeNumber(t)} ${normalizeNumber(e) - n} ` +
            normalizeNumber(t)
        ),
      o.push(`L ${n} ` + normalizeNumber(t)),
      r &&
        o.push(
          `C ${i} ${normalizeNumber(t)} 0 ${normalizeNumber(t) - i} 0 ` +
            (normalizeNumber(t) - n)
        ),
      o.push('L 0 ' + n),
      r && o.push(`C 0 ${i} ${i} 0 ${n} 0`),
      o.join(' ')
    );
  },
  getTrianglePath = ({ width: e, height: t }) => {
    var r = normalizeNumber(e / 2),
      n = [`M ${r} 0`];
    return (
      n.push(`L ${normalizeNumber(e)} ` + normalizeNumber(t)),
      n.push('L 0 ' + normalizeNumber(t)),
      n.push(`L ${r} 0`),
      n.join(' ')
    );
  },
  getTriangleUpsideDownPath = ({ width: e, height: t }) => {
    var r = normalizeNumber(e / 2),
      n = ['M 0 0'];
    return (
      n.push(`L ${normalizeNumber(e)} 0`),
      n.push(`L ${r} ` + normalizeNumber(t)),
      n.push('L 0 0'),
      n.join(' ')
    );
  },
  PADDING$1 = 16,
  getParallelogramPath = ({ width: e, height: t }) => {
    var r = [`M ${PADDING$1} 0`];
    return (
      r.push(`L ${normalizeNumber(e)} 0`),
      r.push(`L ${normalizeNumber(e) - PADDING$1} ` + normalizeNumber(t)),
      r.push('L 0 ' + normalizeNumber(t)),
      r.push(`L ${PADDING$1} 0`),
      r.join(' ')
    );
  },
  getParallelogramUpsideDownPath = ({ width: e, height: t }) => {
    var r = [`M ${normalizeNumber(e - PADDING$1)} 0`];
    return (
      r.push('L 0 0'),
      r.push(`L ${PADDING$1} ` + normalizeNumber(t)),
      r.push(`L ${PADDING$1} ` + normalizeNumber(t)),
      r.push(`L ${normalizeNumber(e)} ` + normalizeNumber(t)),
      r.push(`L ${normalizeNumber(e) - PADDING$1} 0`),
      r.join(' ')
    );
  },
  ARROW_SIZE = 32,
  getArrowPath = ({ width: e, height: t }) => {
    var r = normalizeNumber(t / 4),
      n = [`M ${normalizeNumber(e) - ARROW_SIZE} 0`];
    return (
      n.push(`L ${normalizeNumber(e)} ` + normalizeNumber(t / 2)),
      n.push(`L ${normalizeNumber(e) - ARROW_SIZE} ` + normalizeNumber(t)),
      n.push(`L ${normalizeNumber(e) - ARROW_SIZE} ` + normalizeNumber(t - r)),
      n.push('L 0 ' + normalizeNumber(t - r)),
      n.push('L 0 ' + normalizeNumber(r)),
      n.push(`L ${normalizeNumber(e) - ARROW_SIZE} ` + normalizeNumber(r)),
      n.push(`L  ${normalizeNumber(e) - ARROW_SIZE} 0`),
      n.join(' ')
    );
  },
  getArrowBottomPath = ({ width: e, height: t }) => {
    var r = normalizeNumber(e / 4),
      n = [`M ${normalizeNumber(r)} 0`];
    return (
      n.push(`L ${normalizeNumber(e - r)} 0`),
      n.push(
        `L ${normalizeNumber(e - r)} ` + (normalizeNumber(t) - ARROW_SIZE)
      ),
      n.push(`L ${normalizeNumber(e)} ` + (normalizeNumber(t) - ARROW_SIZE)),
      n.push(`L ${normalizeNumber(e / 2)} ` + t),
      n.push('L 0 ' + (normalizeNumber(t) - ARROW_SIZE)),
      n.push(`L ${r} ` + (normalizeNumber(t) - ARROW_SIZE)),
      n.push(`L ${r} 0`),
      n.join(' ')
    );
  },
  getArrowTopPath = ({ width: e, height: t }) => {
    var r = e / 4,
      n = [`M ${normalizeNumber(e / 2)} 0`];
    return (
      n.push(`L ${normalizeNumber(e)} ` + ARROW_SIZE),
      n.push(`L ${normalizeNumber(e - r)} ` + ARROW_SIZE),
      n.push(`L ${normalizeNumber(e - r)} ` + normalizeNumber(t)),
      n.push(`L ${r} ` + normalizeNumber(t)),
      n.push(`L ${r} ` + ARROW_SIZE),
      n.push('L 0 ' + ARROW_SIZE),
      n.push(`L ${normalizeNumber(e / 2)} 0`),
      n.join(' ')
    );
  },
  getArrowLeftPath = ({ width: e, height: t }) => {
    var r = normalizeNumber(t / 4),
      n = [`M ${ARROW_SIZE} 0`];
    return (
      n.push(`L ${ARROW_SIZE} ` + r),
      n.push(`L ${normalizeNumber(e)} ` + r),
      n.push(`L ${normalizeNumber(e)} ` + (normalizeNumber(t) - r)),
      n.push(`L ${ARROW_SIZE} ` + (normalizeNumber(t) - r)),
      n.push(`L ${ARROW_SIZE} ` + normalizeNumber(t)),
      n.push('L 0 ' + normalizeNumber(t / 2)),
      n.push(`L ${ARROW_SIZE} 0`),
      n.join(' ')
    );
  },
  getChevronPath = ({ width: e, height: t }) => {
    var r = ARROW_SIZE / 2,
      n = normalizeNumber(t / 2),
      i = ['M 0 0'];
    return (
      i.push(`L ${normalizeNumber(e) - r} 0`),
      i.push(`L ${normalizeNumber(e)} ` + n),
      i.push(`L ${normalizeNumber(e) - r} ` + t),
      i.push('L 0 ' + normalizeNumber(t)),
      i.push(`L ${r} ` + n),
      i.push('L 0 0'),
      i.join(' ')
    );
  },
  getArrowPentagonPath = ({ width: e, height: t }) => {
    var r = ARROW_SIZE / 2,
      n = t / 2,
      i = ['M 0 0'];
    return (
      i.push(`L ${e - r} 0`),
      i.push(`L ${e} ` + n),
      i.push(`L ${e - r} ` + t),
      i.push('L 0 ' + t),
      i.push('L 0 0'),
      i.join(' ')
    );
  },
  getRhombusPath = ({ width: e, height: t }) => {
    var r = normalizeNumber(e / 2),
      n = normalizeNumber(t / 2),
      i = [`M ${r} 0`];
    return (
      i.push(`L ${normalizeNumber(e)} ` + n),
      i.push(`L ${r} ` + normalizeNumber(t)),
      i.push('L 0 ' + n),
      i.push(`L ${r} 0`),
      i.join(' ')
    );
  },
  PADDING = 16,
  getTrapezoidPath = ({ width: e, height: t }) => {
    var r = [`M ${PADDING} 0`];
    return (
      r.push(`L ${normalizeNumber(e) - PADDING} 0`),
      r.push(`L ${normalizeNumber(e)} ` + normalizeNumber(t)),
      r.push('L 0 ' + normalizeNumber(t)),
      r.push(`L ${PADDING} 0`),
      r.join(' ')
    );
  },
  getTrapezoidUpsideDownPath = ({ width: e, height: t }) => {
    var r = ['M 0 0'];
    return (
      r.push(`L ${normalizeNumber(e)} 0`),
      r.push(`L ${normalizeNumber(e) - PADDING} ` + normalizeNumber(t)),
      r.push(`L ${PADDING} ` + normalizeNumber(t)),
      r.push('L 0 0'),
      r.join(' ')
    );
  },
  getCrossPath = ({ width: e, height: t }) => {
    var r = normalizeNumber(e / 3),
      n = 2 * r,
      i = normalizeNumber(t / 3),
      o = 2 * i,
      a = [`M ${r} 0`];
    return (
      a.push(`L ${n} 0`),
      a.push(`L ${n} ` + i),
      a.push(`L ${normalizeNumber(e)} ` + i),
      a.push(`L ${normalizeNumber(e)} ` + o),
      a.push(`L ${n} ` + o),
      a.push(`L ${n} ` + normalizeNumber(t)),
      a.push(`L ${r} ` + normalizeNumber(t)),
      a.push(`L ${r} ` + o),
      a.push('L 0 ' + o),
      a.push('L 0 ' + i),
      a.push(`L ${r} ` + i),
      a.push(`L ${r} 0`),
      a.join(' ')
    );
  },
  getPentagonPath = ({ width: e, height: t }) => {
    var r = [`M ${normalizeNumber(e / 2)} 0`];
    return (
      r.push(`L ${normalizeNumber(e)} ` + normalizeNumber(0.382 * t)),
      r.push(`L ${normalizeNumber(e - 0.191 * e)} ` + normalizeNumber(t)),
      r.push(`L ${normalizeNumber(0.191 * e)} ` + normalizeNumber(t)),
      r.push('L 0 ' + normalizeNumber(0.382 * t)),
      r.push(`L ${normalizeNumber(e / 2)} 0`),
      r.join(' ')
    );
  },
  getHexagonVerticalPath = ({ width: e, height: t }) => {
    var r = normalizeNumber(0.25 * t),
      n = [`M ${normalizeNumber(e / 2)} 0`];
    return (
      n.push(`L ${normalizeNumber(e)} ` + r),
      n.push(`L ${normalizeNumber(e)} ` + (normalizeNumber(t) - r)),
      n.push(`L ${normalizeNumber(e / 2)} ` + normalizeNumber(t)),
      n.push('L 0 ' + normalizeNumber(t - r)),
      n.push('L 0 ' + r),
      n.push(`L ${normalizeNumber(e / 2)} 0`),
      n.join(' ')
    );
  },
  getHexagonHorizontalPath = ({ width: e, height: t }) => {
    var r = normalizeNumber(0.25 * e),
      n = [`M ${r} 0`];
    return (
      n.push(`L ${normalizeNumber(e) - r} 0`),
      n.push(`L ${normalizeNumber(e)} ` + normalizeNumber(t / 2)),
      n.push(`L ${normalizeNumber(e - r)} ` + normalizeNumber(t)),
      n.push(`L ${r} ` + normalizeNumber(t)),
      n.push('L 0 ' + normalizeNumber(t / 2)),
      n.push(`L ${r} 0`),
      n.join(' ')
    );
  },
  getOctagonPath = ({ width: e, height: t }) => {
    var r = normalizeNumber(0.29 * e),
      n = normalizeNumber(0.29 * t),
      i = [`M ${r} 0`];
    return (
      i.push(`L ${normalizeNumber(e) - r} 0`),
      i.push(`L ${normalizeNumber(e)} ` + n),
      i.push(`L ${normalizeNumber(e)} ` + (normalizeNumber(t) - n)),
      i.push(`L ${normalizeNumber(e) - r} ` + normalizeNumber(t)),
      i.push(`L ${r} ` + normalizeNumber(t)),
      i.push('L 0 ' + (normalizeNumber(t) - n)),
      i.push('L 0 ' + n),
      i.push(`L ${r} 0`),
      i.join(' ')
    );
  },
  getShapePath = (e, t) => {
    switch (e) {
      case 'circle':
        return getCirclePath(t);
      case 'rectangle':
        return getRectanglePath(t);
      case 'triangle':
        return getTrianglePath(t);
      case 'triangleUpsideDown':
        return getTriangleUpsideDownPath(t);
      case 'cross':
        return getCrossPath(t);
      case 'parallelogram':
        return getParallelogramPath(t);
      case 'parallelogramUpsideDown':
        return getParallelogramUpsideDownPath(t);
      case 'trapezoid':
        return getTrapezoidPath(t);
      case 'trapezoidUpsideDown':
        return getTrapezoidUpsideDownPath(t);
      case 'arrowRight':
        return getArrowPath(t);
      case 'arrowLeft':
        return getArrowLeftPath(t);
      case 'arrowTop':
        return getArrowTopPath(t);
      case 'arrowBottom':
        return getArrowBottomPath(t);
      case 'rhombus':
        return getRhombusPath(t);
      case 'chevron':
        return getChevronPath(t);
      case 'arrowPentagon':
        return getArrowPentagonPath(t);
      case 'pentagon':
        return getPentagonPath(t);
      case 'hexagonVertical':
        return getHexagonVerticalPath(t);
      case 'hexagonHorizontal':
        return getHexagonHorizontalPath(t);
      case 'octagon':
        return getOctagonPath(t);
    }
  },
  hex2rgb = (e) =>
    (e = '#' === e[0] ? e.substring(1) : e).length < 6
      ? {
          r: parseInt(e[0] + e[0], 16),
          g: parseInt(e[1] + e[1], 16),
          b: parseInt(e[2] + e[2], 16),
          a:
            4 === e.length
              ? Math.round((parseInt(e[3] + e[3], 16) / 255) * 100) / 100
              : 1,
        }
      : {
          r: parseInt(e.substring(0, 2), 16),
          g: parseInt(e.substring(2, 4), 16),
          b: parseInt(e.substring(4, 6), 16),
          a:
            8 === e.length
              ? Math.round((parseInt(e.substring(6, 8), 16) / 255) * 100) / 100
              : 1,
        },
  rgb2hsv = ({ r: e, g: t, b: r, a: n }) => {
    let i;
    var o = Math.max(e, t, r),
      a = o - Math.min(e, t, r);
    return (
      (i =
        0 == a
          ? 0
          : e === o
          ? ((t - r) / a) % 6
          : t === o
          ? (r - e) / a + 2
          : (e - t) / a + 4),
      (i *= 60) < 0 && (i += 360),
      { h: i, s: 100 * (0 === o ? 0 : a / o), v: (o / 255) * 100, a: n }
    );
  },
  hsl2hsv = ({ h: e, s: t, l: r, a: n }) => ({
    h: e,
    s: 0 < (t *= (r < 50 ? r : 100 - r) / 100) ? ((2 * t) / (r + t)) * 100 : 0,
    v: r + t,
    a: n,
  }),
  hsv2rgb = ({ h: e, s: t, v: r, a: n }) => {
    let i = [];
    var t = (r /= 100) * (t /= 100),
      o = e / 60,
      a = t * (1 - Math.abs((o % 2) - 1)),
      r = r - t;
    return (
      (i =
        0 <= o && o < 1
          ? [t, a, 0]
          : 1 <= o && o < 2
          ? [a, t, 0]
          : 2 <= o && o < 3
          ? [0, t, a]
          : 3 <= e && o < 4
          ? [0, a, t]
          : 4 <= e && o < 5
          ? [a, 0, t]
          : 5 <= e && o <= 6
          ? [t, 0, a]
          : [0, 0, 0]),
      {
        r: Math.round(255 * (i[0] + r)),
        g: Math.round(255 * (i[1] + r)),
        b: Math.round(255 * (i[2] + r)),
        a: n,
      }
    );
  },
  convert = (e) => {
    e = e.toString(16);
    return 1 === e.length ? '0' + e : e;
  },
  rgb2hex = ({ r: e, g: t, b: r, a: n }) => {
    n = n < 1 ? convert(Math.round(255 * n)) : '';
    return '#' + [convert(e), convert(t), convert(r), n].join('');
  },
  hsv2hex = ({ h: e, s: t, v: r, a: n }) => {
    e = hsv2rgb({ h: e, s: t, v: r, a: n });
    return rgb2hex(e);
  },
  hsv2hsl = ({ h: e, s: t, v: r, a: n }) => {
    var i = ((200 - t) * r) / 100;
    return {
      h: e,
      s:
        0 < i && i < 200 ? ((t * r) / 100 / (i <= 100 ? i : 200 - i)) * 100 : 0,
      l: i / 2,
      a: n,
    };
  },
  rgbColorRegex =
    /rgba?\((?<r>[.\d]+)[, ]+(?<g>[.\d]+)[, ]+(?<b>[.\d]+)(?:\s?[,\/]\s?(?<a>[.\d]+%?))?\)/i,
  parseRgba = (e) => {
    e = rgbColorRegex.exec(e);
    if (null != e && e.groups)
      return {
        r: parseInt(e.groups.r, 10),
        g: parseInt(e.groups.g, 10),
        b: parseInt(e.groups.b, 10),
        a: void 0 !== e.groups.a ? parseInt(e.groups.a) : 1,
      };
  },
  hexColorRegex = /^#[0-9A-F]{3,6}[0-9a-f]{0,2}$/i,
  parseHex = (e) => hex2rgb(e),
  parseColor = (e) => {
    let t;
    if (
      (rgbColorRegex.test(e)
        ? (t = parseRgba(e))
        : hexColorRegex.test(e) && (t = parseHex(e)),
      t)
    )
      return rgb2hsv(t);
    throw new Error('Cannot parse ' + e);
  },
  isRGB = (e) => Object.keys(e).every((e) => ['r', 'g', 'b', 'a'].includes(e)),
  isHSL = (e) => Object.keys(e).every((e) => ['h', 's', 'l', 'a'].includes(e)),
  hsv2hwb = ({ h: e, s: t, v: r }) => ({
    h: e,
    w: ((100 - t) * r) / 100,
    b: 100 - r,
  }),
  hwb2hsv = ({ h: e, w: t, b: r }, n) => ({
    h: e,
    s: Math.max(0, Math.min(100, 100 === r ? 0 : 100 - (t / (100 - r)) * 100)),
    v: 100 - r,
    a: n,
  });
class Color {
  constructor(e) {
    var t;
    Object.defineProperty(this, '_color', {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, '_alpha', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      'string' == typeof e
        ? ((t = parseColor(e)), (this._color = t), (this._alpha = t.a || 1))
        : (isRGB(e)
            ? (this._color = rgb2hsv(e))
            : isHSL(e)
            ? (this._color = hsl2hsv(e))
            : (this._color = e),
          (this._alpha = e.a || 1));
  }
  alpha(e) {
    return (this._alpha = e), this;
  }
  white() {
    return this.toHwb().w;
  }
  darken(e) {
    var t = this.toHsl();
    return (
      (t.l = Math.min(100, Math.max(t.l - t.l * e, 0))),
      (this._color = hsl2hsv(t)),
      this
    );
  }
  whiten(e) {
    var t = this.toHwb();
    return (
      (t.w = Math.min(100, Math.max(t.w + t.w * e, 0))),
      (this._color = hwb2hsv(t, this._alpha)),
      this
    );
  }
  blacken(e) {
    var t = this.toHwb();
    return (
      (t.b = Math.min(100, Math.max(t.b + t.b * e, 0))),
      (this._color = hwb2hsv(t, this._alpha)),
      this
    );
  }
  toHwb() {
    return hsv2hwb(this._color);
  }
  toHsl() {
    return hsv2hsl(
      Object.assign(Object.assign({}, this._color), { a: this._alpha })
    );
  }
  toRgbString() {
    var e = hsv2rgb(
      Object.assign(Object.assign({}, this._color), { a: this._alpha })
    );
    return `rgb${1 !== e.a ? 'a' : ''}(${e.r}, ${e.g}, ${e.b}${
      1 !== e.a ? ', ' + e.a : ''
    })`;
  }
  toHex() {
    return hsv2hex(
      Object.assign(Object.assign({}, this._color), { a: this._alpha })
    );
  }
}
var lib = {},
  uaParser_min = { exports: {} },
  uaParser_minExports =
    (uaParser_min.exports,
    !(function (z, L) {
      function e(e) {
        for (var t = {}, r = 0; r < e.length; r++) t[e[r].toUpperCase()] = e[r];
        return t;
      }
      function M(e, t) {
        return typeof e === g && -1 !== k(t).indexOf(k(e));
      }
      function s(e, t) {
        if (typeof e === g)
          return (
            (e = e.replace(/^\s\s*/, p)),
            typeof t == d ? e : e.substring(0, 350)
          );
      }
      function u(e, t) {
        for (var r, n, i, o, a, s = 0; s < t.length && !o; ) {
          for (
            var u = t[s], c = t[s + 1], l = (r = 0);
            l < u.length && !o && u[l];

          )
            if ((o = u[l++].exec(e)))
              for (n = 0; n < c.length; n++)
                (a = o[++r]),
                  typeof (i = c[n]) === m && 0 < i.length
                    ? 2 === i.length
                      ? typeof i[1] == h
                        ? (this[i[0]] = i[1].call(this, a))
                        : (this[i[0]] = i[1])
                      : 3 === i.length
                      ? typeof i[1] !== h || (i[1].exec && i[1].test)
                        ? (this[i[0]] = a ? a.replace(i[1], i[2]) : f)
                        : (this[i[0]] = a ? i[1].call(this, a, i[2]) : f)
                      : 4 === i.length &&
                        (this[i[0]] = a
                          ? i[3].call(this, a.replace(i[1], i[2]))
                          : f)
                    : (this[i] = a || f);
          s += 2;
        }
      }
      function t(e, t) {
        for (var r in t)
          if (typeof t[r] === m && 0 < t[r].length) {
            for (var n = 0; n < t[r].length; n++)
              if (M(t[r][n], e)) return '?' === r ? f : r;
          } else if (M(t[r], e)) return '?' === r ? f : r;
        return e;
      }
      function c(e, t) {
        var r, n, i, o, a;
        return (
          typeof e === m && ((t = e), (e = f)),
          this instanceof c
            ? ((r = typeof l != d && l.navigator ? l.navigator : f),
              (n = e || (r && r.userAgent ? r.userAgent : p)),
              (i = r && r.userAgentData ? r.userAgentData : f),
              (o = t
                ? (function (e, t) {
                    var r,
                      n = {};
                    for (r in e)
                      t[r] && t[r].length % 2 == 0
                        ? (n[r] = t[r].concat(e[r]))
                        : (n[r] = e[r]);
                    return n;
                  })(P, t)
                : P),
              (a = r && r.userAgent == n),
              (this.getBrowser = function () {
                var e,
                  t = {};
                return (
                  (t[v] = f),
                  (t[_] = f),
                  u.call(t, n, o.browser),
                  (t.major =
                    typeof (e = t[_]) === g
                      ? e.replace(/[^\d\.]/g, p).split('.')[0]
                      : f),
                  a &&
                    r &&
                    r.brave &&
                    typeof r.brave.isBrave == h &&
                    (t[v] = 'Brave'),
                  t
                );
              }),
              (this.getCPU = function () {
                var e = {};
                return (e[x] = f), u.call(e, n, o.cpu), e;
              }),
              (this.getDevice = function () {
                var e = {};
                return (
                  (e[w] = f),
                  (e[b] = f),
                  (e[y] = f),
                  u.call(e, n, o.device),
                  a && !e[y] && i && i.mobile && (e[y] = E),
                  a &&
                    'Macintosh' == e[b] &&
                    r &&
                    typeof r.standalone != d &&
                    r.maxTouchPoints &&
                    2 < r.maxTouchPoints &&
                    ((e[b] = 'iPad'), (e[y] = S)),
                  e
                );
              }),
              (this.getEngine = function () {
                var e = {};
                return (e[v] = f), (e[_] = f), u.call(e, n, o.engine), e;
              }),
              (this.getOS = function () {
                var e = {};
                return (
                  (e[v] = f),
                  (e[_] = f),
                  u.call(e, n, o.os),
                  a &&
                    !e[v] &&
                    i &&
                    'Unknown' != i.platform &&
                    (e[v] = i.platform
                      .replace(/chrome os/i, W)
                      .replace(/macos/i, 'Mac OS')),
                  e
                );
              }),
              (this.getResult = function () {
                return {
                  ua: this.getUA(),
                  browser: this.getBrowser(),
                  engine: this.getEngine(),
                  os: this.getOS(),
                  device: this.getDevice(),
                  cpu: this.getCPU(),
                };
              }),
              (this.getUA = function () {
                return n;
              }),
              (this.setUA = function (e) {
                return (
                  (n = typeof e === g && 350 < e.length ? s(e, 350) : e), this
                );
              }),
              this.setUA(n),
              this)
            : new c(e, t).getResult()
        );
      }
      var l,
        f,
        n,
        p,
        h,
        d,
        m,
        g,
        b,
        v,
        y,
        w,
        _,
        x,
        E,
        S,
        r,
        i,
        o,
        D,
        a,
        I,
        T,
        O,
        N,
        C,
        $,
        j,
        W,
        k,
        A,
        P,
        R;
      (l = 'object' == typeof window ? window : commonjsGlobal),
        (h = 'function'),
        (d = 'undefined'),
        (m = 'object'),
        (g = 'string'),
        (P = {
          browser: [
            [/\b(?:crmo|crios)\/([\w\.]+)/i],
            [(_ = 'version'), [(v = 'name'), (a = 'Chrome')]],
            [/edg(?:e|ios|a)?\/([\w\.]+)/i],
            [_, [v, 'Edge']],
            [
              /(opera mini)\/([-\w\.]+)/i,
              /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
              /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
            ],
            [v, _],
            [/opios[\/ ]+([\w\.]+)/i],
            [_, [v, (j = 'Opera') + ' Mini']],
            [/\bopr\/([\w\.]+)/i],
            [_, [v, j]],
            [
              /(kindle)\/([\w\.]+)/i,
              /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
              /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
              /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
              /(?:ms|\()(ie) ([\w\.]+)/i,
              /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
              /(heytap|ovi)browser\/([\d\.]+)/i,
              /(weibo)__([\d\.]+)/i,
            ],
            [v, _],
            [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
            [_, [v, 'UC' + (O = 'Browser')]],
            [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i],
            [_, [v, 'WeChat(Win) Desktop']],
            [/micromessenger\/([\w\.]+)/i],
            [_, [v, 'WeChat']],
            [/konqueror\/([\w\.]+)/i],
            [_, [v, 'Konqueror']],
            [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
            [_, [v, 'IE']],
            [/ya(?:search)?browser\/([\w\.]+)/i],
            [_, [v, 'Yandex']],
            [/(avast|avg)\/([\w\.]+)/i],
            [[v, /(.+)/, '$1 Secure ' + O], _],
            [/\bfocus\/([\w\.]+)/i],
            [_, [v, (I = 'Firefox') + ' Focus']],
            [/\bopt\/([\w\.]+)/i],
            [_, [v, j + ' Touch']],
            [/coc_coc\w+\/([\w\.]+)/i],
            [_, [v, 'Coc Coc']],
            [/dolfin\/([\w\.]+)/i],
            [_, [v, 'Dolphin']],
            [/coast\/([\w\.]+)/i],
            [_, [v, j + ' Coast']],
            [/miuibrowser\/([\w\.]+)/i],
            [_, [v, 'MIUI ' + O]],
            [/fxios\/([-\w\.]+)/i],
            [_, [v, I]],
            [/\bqihu|(qi?ho?o?|360)browser/i],
            [[v, '360 ' + O]],
            [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
            [[v, /(.+)/, '$1 ' + O], _],
            [/(comodo_dragon)\/([\w\.]+)/i],
            [[v, /_/g, ' '], _],
            [
              /(electron)\/([\w\.]+) safari/i,
              /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
              /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
            ],
            [v, _],
            [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i],
            [v],
            [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
            [[v, (j = 'Facebook')], _],
            [
              /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
              /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
              /safari (line)\/([\w\.]+)/i,
              /\b(line)\/([\w\.]+)\/iab/i,
              /(chromium|instagram)[\/ ]([-\w\.]+)/i,
            ],
            [v, _],
            [/\bgsa\/([\w\.]+) .*safari\//i],
            [_, [v, 'GSA']],
            [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
            [_, [v, 'TikTok']],
            [/headlesschrome(?:\/([\w\.]+)| )/i],
            [_, [v, a + ' Headless']],
            [/ wv\).+(chrome)\/([\w\.]+)/i],
            [[v, a + ' WebView'], _],
            [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
            [_, [v, 'Android ' + O]],
            [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
            [v, _],
            [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
            [_, [v, 'Mobile Safari']],
            [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
            [_, v],
            [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
            [
              v,
              [
                _,
                t,
                {
                  '1.0': '/8',
                  1.2: '/1',
                  1.3: '/3',
                  '2.0': '/412',
                  '2.0.2': '/416',
                  '2.0.3': '/417',
                  '2.0.4': '/419',
                  '?': '/',
                },
              ],
            ],
            [/(webkit|khtml)\/([\w\.]+)/i],
            [v, _],
            [/(navigator|netscape\d?)\/([-\w\.]+)/i],
            [[v, 'Netscape'], _],
            [/mobile vr; rv:([\w\.]+)\).+firefox/i],
            [_, [v, I + ' Reality']],
            [
              /ekiohf.+(flow)\/([\w\.]+)/i,
              /(swiftfox)/i,
              /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
              /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
              /(firefox)\/([\w\.]+)/i,
              /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
              /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
              /(links) \(([\w\.]+)/i,
              /panasonic;(viera)/i,
            ],
            [v, _],
            [/(cobalt)\/([\w\.]+)/i],
            [v, [_, /master.|lts./, (p = '')]],
          ],
          cpu: [
            [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
            [[(x = 'architecture'), 'amd64']],
            [/(ia32(?=;))/i],
            [
              [
                x,
                (k = function (e) {
                  return e.toLowerCase();
                }),
              ],
            ],
            [/((?:i[346]|x)86)[;\)]/i],
            [[x, 'ia32']],
            [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
            [[x, 'arm64']],
            [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
            [[x, 'armhf']],
            [/windows (ce|mobile); ppc;/i],
            [[x, 'arm']],
            [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
            [[x, /ower/, p, k]],
            [/(sun4\w)[;\)]/i],
            [[x, 'sparc']],
            [
              /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
            ],
            [[x, k]],
          ],
          device: [
            [
              /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
            ],
            [
              (b = 'model'),
              [(w = 'vendor'), (O = 'Samsung')],
              [(y = 'type'), (S = 'tablet')],
            ],
            [
              /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
              /samsung[- ]([-\w]+)/i,
              /sec-(sgh\w+)/i,
            ],
            [b, [w, O], [y, (E = 'mobile')]],
            [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
            [b, [w, (o = 'Apple')], [y, E]],
            [
              /\((ipad);[-\w\),; ]+apple/i,
              /applecoremedia\/[\w\.]+ \((ipad)/i,
              /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
            ],
            [b, [w, o], [y, S]],
            [/(macintosh);/i],
            [b, [w, o]],
            [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
            [b, [w, 'Sharp'], [y, E]],
            [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
            [b, [w, 'Huawei'], [y, S]],
            [
              /(?:huawei|honor)([-\w ]+)[;\)]/i,
              /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
            ],
            [b, [w, 'Huawei'], [y, E]],
            [
              /\b(poco[\w ]+)(?: bui|\))/i,
              /\b; (\w+) build\/hm\1/i,
              /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
              /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
              /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
            ],
            [
              [b, /_/g, ' '],
              [w, (C = 'Xiaomi')],
              [y, E],
            ],
            [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
            [
              [b, /_/g, ' '],
              [w, C],
              [y, S],
            ],
            [
              /; (\w+) bui.+ oppo/i,
              /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
            ],
            [b, [w, 'OPPO'], [y, E]],
            [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
            [b, [w, 'Vivo'], [y, E]],
            [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
            [b, [w, 'Realme'], [y, E]],
            [
              /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
              /\bmot(?:orola)?[- ](\w*)/i,
              /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
            ],
            [b, [w, (T = 'Motorola')], [y, E]],
            [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
            [b, [w, T], [y, S]],
            [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
            [b, [w, 'LG'], [y, S]],
            [
              /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
              /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
              /\blg-?([\d\w]+) bui/i,
            ],
            [b, [w, 'LG'], [y, E]],
            [
              /(ideatab[-\w ]+)/i,
              /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
            ],
            [b, [w, 'Lenovo'], [y, S]],
            [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
            [
              [b, /_/g, ' '],
              [w, 'Nokia'],
              [y, E],
            ],
            [/(pixel c)\b/i],
            [b, [w, (T = 'Google')], [y, S]],
            [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
            [b, [w, T], [y, E]],
            [
              /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
            ],
            [b, [w, (N = 'Sony')], [y, E]],
            [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
            [
              [b, 'Xperia Tablet'],
              [w, N],
              [y, S],
            ],
            [
              / (kb2005|in20[12]5|be20[12][59])\b/i,
              /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
            ],
            [b, [w, 'OnePlus'], [y, E]],
            [
              /(alexa)webm/i,
              /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
              /(kf[a-z]+)( bui|\)).+silk\//i,
            ],
            [b, [w, (i = 'Amazon')], [y, S]],
            [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
            [
              [b, /(.+)/g, 'Fire Phone $1'],
              [w, i],
              [y, E],
            ],
            [/(playbook);[-\w\),; ]+(rim)/i],
            [b, w, [y, S]],
            [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
            [b, [w, (D = 'BlackBerry')], [y, E]],
            [
              /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
            ],
            [b, [w, 'ASUS'], [y, S]],
            [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
            [b, [w, 'ASUS'], [y, E]],
            [/(nexus 9)/i],
            [b, [w, 'HTC'], [y, S]],
            [
              /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
              /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
              /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
            ],
            [w, [b, /_/g, ' '], [y, E]],
            [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
            [b, [w, 'Acer'], [y, S]],
            [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
            [b, [w, 'Meizu'], [y, E]],
            [
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
              /(hp) ([\w ]+\w)/i,
              /(asus)-?(\w+)/i,
              /(microsoft); (lumia[\w ]+)/i,
              /(lenovo)[-_ ]?([-\w]+)/i,
              /(jolla)/i,
              /(oppo) ?([\w ]+) bui/i,
            ],
            [w, b, [y, E]],
            [
              /(kobo)\s(ereader|touch)/i,
              /(archos) (gamepad2?)/i,
              /(hp).+(touchpad(?!.+tablet)|tablet)/i,
              /(kindle)\/([\w\.]+)/i,
              /(nook)[\w ]+build\/(\w+)/i,
              /(dell) (strea[kpr\d ]*[\dko])/i,
              /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
              /(trinity)[- ]*(t\d{3}) bui/i,
              /(gigaset)[- ]+(q\w{1,9}) bui/i,
              /(vodafone) ([\w ]+)(?:\)| bui)/i,
            ],
            [w, b, [y, S]],
            [/(surface duo)/i],
            [b, [w, (A = 'Microsoft')], [y, S]],
            [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
            [b, [w, 'Fairphone'], [y, E]],
            [/(u304aa)/i],
            [b, [w, 'AT&T'], [y, E]],
            [/\bsie-(\w*)/i],
            [b, [w, 'Siemens'], [y, E]],
            [/\b(rct\w+) b/i],
            [b, [w, 'RCA'], [y, S]],
            [/\b(venue[\d ]{2,7}) b/i],
            [b, [w, 'Dell'], [y, S]],
            [/\b(q(?:mv|ta)\w+) b/i],
            [b, [w, 'Verizon'], [y, S]],
            [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
            [b, [w, 'Barnes & Noble'], [y, S]],
            [/\b(tm\d{3}\w+) b/i],
            [b, [w, 'NuVision'], [y, S]],
            [/\b(k88) b/i],
            [b, [w, 'ZTE'], [y, S]],
            [/\b(nx\d{3}j) b/i],
            [b, [w, 'ZTE'], [y, E]],
            [/\b(gen\d{3}) b.+49h/i],
            [b, [w, 'Swiss'], [y, E]],
            [/\b(zur\d{3}) b/i],
            [b, [w, 'Swiss'], [y, S]],
            [/\b((zeki)?tb.*\b) b/i],
            [b, [w, 'Zeki'], [y, S]],
            [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
            [[w, 'Dragon Touch'], b, [y, S]],
            [/\b(ns-?\w{0,9}) b/i],
            [b, [w, 'Insignia'], [y, S]],
            [/\b((nxa|next)-?\w{0,9}) b/i],
            [b, [w, 'NextBook'], [y, S]],
            [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
            [[w, 'Voice'], b, [y, E]],
            [/\b(lvtel\-)?(v1[12]) b/i],
            [[w, 'LvTel'], b, [y, E]],
            [/\b(ph-1) /i],
            [b, [w, 'Essential'], [y, E]],
            [/\b(v(100md|700na|7011|917g).*\b) b/i],
            [b, [w, 'Envizen'], [y, S]],
            [/\b(trio[-\w\. ]+) b/i],
            [b, [w, 'MachSpeed'], [y, S]],
            [/\btu_(1491) b/i],
            [b, [w, 'Rotor'], [y, S]],
            [/(shield[\w ]+) b/i],
            [b, [w, 'Nvidia'], [y, S]],
            [/(sprint) (\w+)/i],
            [w, b, [y, E]],
            [/(kin\.[onetw]{3})/i],
            [
              [b, /\./g, ' '],
              [w, A],
              [y, E],
            ],
            [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
            [b, [w, ($ = 'Zebra')], [y, S]],
            [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
            [b, [w, $], [y, E]],
            [/smart-tv.+(samsung)/i],
            [w, [y, (r = 'smarttv')]],
            [/hbbtv.+maple;(\d+)/i],
            [
              [b, /^/, 'SmartTV'],
              [w, O],
              [y, r],
            ],
            [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
            [
              [w, 'LG'],
              [y, r],
            ],
            [/(apple) ?tv/i],
            [w, [b, o + ' TV'], [y, r]],
            [/crkey/i],
            [
              [b, a + 'cast'],
              [w, T],
              [y, r],
            ],
            [/droid.+aft(\w)( bui|\))/i],
            [b, [w, i], [y, r]],
            [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
            [b, [w, 'Sharp'], [y, r]],
            [/(bravia[\w ]+)( bui|\))/i],
            [b, [w, N], [y, r]],
            [/(mitv-\w{5}) bui/i],
            [b, [w, C], [y, r]],
            [/Hbbtv.*(technisat) (.*);/i],
            [w, b, [y, r]],
            [
              /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
              /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
            ],
            [
              [w, s],
              [b, s],
              [y, r],
            ],
            [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
            [[y, r]],
            [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
            [w, b, [y, (O = 'console')]],
            [/droid.+; (shield) bui/i],
            [b, [w, 'Nvidia'], [y, O]],
            [/(playstation [345portablevi]+)/i],
            [b, [w, N], [y, O]],
            [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
            [b, [w, A], [y, O]],
            [/((pebble))app/i],
            [w, b, [y, (C = 'wearable')]],
            [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
            [b, [w, o], [y, C]],
            [/droid.+; (glass) \d/i],
            [b, [w, T], [y, C]],
            [/droid.+; (wt63?0{2,3})\)/i],
            [b, [w, $], [y, C]],
            [/(quest( 2| pro)?)/i],
            [b, [w, j], [y, C]],
            [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
            [w, [y, (N = 'embedded')]],
            [/(aeobc)\b/i],
            [b, [w, i], [y, N]],
            [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
            [b, [y, E]],
            [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
            [b, [y, S]],
            [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
            [[y, S]],
            [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
            [[y, E]],
            [/(android[-\w\. ]{0,9});.+buil/i],
            [b, [w, 'Generic']],
          ],
          engine: [
            [/windows.+ edge\/([\w\.]+)/i],
            [_, [v, 'EdgeHTML']],
            [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
            [_, [v, 'Blink']],
            [
              /(presto)\/([\w\.]+)/i,
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
              /ekioh(flow)\/([\w\.]+)/i,
              /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
              /(icab)[\/ ]([23]\.[\d\.]+)/i,
              /\b(libweb)/i,
            ],
            [v, _],
            [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
            [_, v],
          ],
          os: [
            [/microsoft (windows) (vista|xp)/i],
            [v, _],
            [
              /(windows) nt 6\.2; (arm)/i,
              /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
              /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
            ],
            [
              v,
              [
                _,
                t,
                (A = {
                  ME: '4.90',
                  'NT 3.11': 'NT3.51',
                  'NT 4.0': 'NT4.0',
                  2e3: 'NT 5.0',
                  XP: ['NT 5.1', 'NT 5.2'],
                  Vista: 'NT 6.0',
                  7: 'NT 6.1',
                  8: 'NT 6.2',
                  8.1: 'NT 6.3',
                  10: ['NT 6.4', 'NT 10.0'],
                  RT: 'ARM',
                }),
              ],
            ],
            [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
            [
              [v, 'Windows'],
              [_, t, A],
            ],
            [
              /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
              /ios;fbsv\/([\d\.]+)/i,
              /cfnetwork\/.+darwin/i,
            ],
            [
              [_, /_/g, '.'],
              [v, 'iOS'],
            ],
            [
              /(mac os x) ?([\w\. ]*)/i,
              /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
            ],
            [
              [v, 'Mac OS'],
              [_, /_/g, '.'],
            ],
            [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
            [_, v],
            [
              /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
              /(blackberry)\w*\/([\w\.]*)/i,
              /(tizen|kaios)[\/ ]([\w\.]+)/i,
              /\((series40);/i,
            ],
            [v, _],
            [/\(bb(10);/i],
            [_, [v, D]],
            [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
            [_, [v, 'Symbian']],
            [
              /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
            ],
            [_, [v, I + ' OS']],
            [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
            [_, [v, 'webOS']],
            [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
            [_, [v, 'watchOS']],
            [/crkey\/([\d\.]+)/i],
            [_, [v, a + 'cast']],
            [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
            [[v, (W = 'Chromium OS')], _],
            [
              /panasonic;(viera)/i,
              /(netrange)mmh/i,
              /(nettv)\/(\d+\.[\w\.]+)/i,
              /(nintendo|playstation) ([wids345portablevuch]+)/i,
              /(xbox); +xbox ([^\);]+)/i,
              /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
              /(mint)[\/\(\) ]?(\w*)/i,
              /(mageia|vectorlinux)[; ]/i,
              /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
              /(hurd|linux) ?([\w\.]*)/i,
              /(gnu) ?([\w\.]*)/i,
              /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
              /(haiku) (\w+)/i,
            ],
            [v, _],
            [/(sunos) ?([\w\.\d]*)/i],
            [[v, 'Solaris'], _],
            [
              /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
              /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
              /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
              /(unix) ?([\w\.]*)/i,
            ],
            [v, _],
          ],
        }),
        (c.VERSION = '1.0.35'),
        (c.BROWSER = e([v, _, 'major'])),
        (c.CPU = e([x])),
        (c.DEVICE = e([b, w, y, O, E, r, S, C, N])),
        (c.ENGINE = c.OS = e([v, _])),
        ((L = z.exports ? (z.exports = c) : L).UAParser = c),
        (R = typeof l != d && (l.jQuery || l.Zepto)) &&
          !R.ua &&
          ((n = new c()),
          (R.ua = n.getResult()),
          (R.ua.get = function () {
            return n.getUA();
          }),
          (R.ua.set = function (e) {
            n.setUA(e);
            var t,
              r = n.getResult();
            for (t in r) R.ua[t] = r[t];
          }));
    })(uaParser_min, uaParser_min.exports),
    uaParser_min.exports);
function _interopDefault(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
Object.defineProperty(lib, '__esModule', { value: !0 });
var React = React__default$1,
  React__default = _interopDefault(React),
  UAParser = uaParser_minExports,
  ClientUAInstance = new UAParser(),
  browser = ClientUAInstance.getBrowser(),
  cpu = ClientUAInstance.getCPU(),
  device = ClientUAInstance.getDevice(),
  engine = ClientUAInstance.getEngine(),
  os = ClientUAInstance.getOS(),
  ua = ClientUAInstance.getUA(),
  setUa = function (e) {
    return ClientUAInstance.setUA(e);
  },
  parseUserAgent = function (e) {
    var t;
    if (e)
      return {
        UA: (t = new UAParser(e)),
        browser: t.getBrowser(),
        cpu: t.getCPU(),
        device: t.getDevice(),
        engine: t.getEngine(),
        os: t.getOS(),
        ua: t.getUA(),
        setUserAgent: function (e) {
          return t.setUA(e);
        },
      };
    console.error('No userAgent string was provided');
  },
  UAHelper = Object.freeze({
    ClientUAInstance: ClientUAInstance,
    browser: browser,
    cpu: cpu,
    device: device,
    engine: engine,
    os: os,
    ua: ua,
    setUa: setUa,
    parseUserAgent: parseUserAgent,
  });
function ownKeys(t, e) {
  var r,
    n = Object.keys(t);
  return (
    Object.getOwnPropertySymbols &&
      ((r = Object.getOwnPropertySymbols(t)),
      e &&
        (r = r.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
      n.push.apply(n, r)),
    n
  );
}
function _objectSpread2(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? ownKeys(Object(r), !0).forEach(function (e) {
          _defineProperty(t, e, r[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
      : ownKeys(Object(r)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
        });
  }
  return t;
}
function _typeof(e) {
  return (_typeof =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        })(e);
}
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function _defineProperties(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
  }
}
function _createClass(e, t, r) {
  return (
    t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e
  );
}
function _defineProperty(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function _extends() {
  return (_extends =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var r,
          n = arguments[t];
        for (r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    }).apply(this, arguments);
}
function _inherits(e, t) {
  if ('function' != typeof t && null !== t)
    throw new TypeError('Super expression must either be null or a function');
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    t && _setPrototypeOf(e, t);
}
function _getPrototypeOf(e) {
  return (_getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
}
function _setPrototypeOf(e, t) {
  return (_setPrototypeOf =
    Object.setPrototypeOf ||
    function (e, t) {
      return (e.__proto__ = t), e;
    })(e, t);
}
function _objectWithoutPropertiesLoose(e, t) {
  if (null == e) return {};
  for (var r, n = {}, i = Object.keys(e), o = 0; o < i.length; o++)
    (r = i[o]), 0 <= t.indexOf(r) || (n[r] = e[r]);
  return n;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var r,
    n = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols)
    for (var i = Object.getOwnPropertySymbols(e), o = 0; o < i.length; o++)
      (r = i[o]),
        0 <= t.indexOf(r) ||
          (Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  return n;
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function _possibleConstructorReturn(e, t) {
  if (t && ('object' == typeof t || 'function' == typeof t)) return t;
  if (void 0 !== t)
    throw new TypeError(
      'Derived constructors may only return object or undefined'
    );
  return _assertThisInitialized(e);
}
function _slicedToArray(e, t) {
  return (
    _arrayWithHoles(e) ||
    _iterableToArrayLimit(e, t) ||
    _unsupportedIterableToArray(e, t) ||
    _nonIterableRest()
  );
}
function _arrayWithHoles(e) {
  if (Array.isArray(e)) return e;
}
function _iterableToArrayLimit(e, t) {
  var r =
    null == e
      ? null
      : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
  if (null != r) {
    var n,
      i,
      o = [],
      a = !0,
      s = !1;
    try {
      for (
        r = r.call(e);
        !(a = (n = r.next()).done) && (o.push(n.value), !t || o.length !== t);
        a = !0
      );
    } catch (e) {
      (s = !0), (i = e);
    } finally {
      try {
        a || null == r.return || r.return();
      } finally {
        if (s) throw i;
      }
    }
    return o;
  }
}
function _unsupportedIterableToArray(e, t) {
  var r;
  if (e)
    return 'string' == typeof e
      ? _arrayLikeToArray(e, t)
      : 'Map' ===
          (r =
            'Object' === (r = Object.prototype.toString.call(e).slice(8, -1)) &&
            e.constructor
              ? e.constructor.name
              : r) || 'Set' === r
      ? Array.from(e)
      : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      ? _arrayLikeToArray(e, t)
      : void 0;
}
function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}
var DeviceTypes = {
    Mobile: 'mobile',
    Tablet: 'tablet',
    SmartTv: 'smarttv',
    Console: 'console',
    Wearable: 'wearable',
    Embedded: 'embedded',
    Browser: void 0,
  },
  BrowserTypes = {
    Chrome: 'Chrome',
    Firefox: 'Firefox',
    Opera: 'Opera',
    Yandex: 'Yandex',
    Safari: 'Safari',
    InternetExplorer: 'Internet Explorer',
    Edge: 'Edge',
    Chromium: 'Chromium',
    Ie: 'IE',
    MobileSafari: 'Mobile Safari',
    EdgeChromium: 'Edge Chromium',
    MIUI: 'MIUI Browser',
    SamsungBrowser: 'Samsung Browser',
  },
  OsTypes = {
    IOS: 'iOS',
    Android: 'Android',
    WindowsPhone: 'Windows Phone',
    Windows: 'Windows',
    MAC_OS: 'Mac OS',
  },
  InitialDeviceTypes = {
    isMobile: !1,
    isTablet: !1,
    isBrowser: !1,
    isSmartTV: !1,
    isConsole: !1,
    isWearable: !1,
  },
  checkDeviceType = function (e) {
    switch (e) {
      case DeviceTypes.Mobile:
        return { isMobile: !0 };
      case DeviceTypes.Tablet:
        return { isTablet: !0 };
      case DeviceTypes.SmartTv:
        return { isSmartTV: !0 };
      case DeviceTypes.Console:
        return { isConsole: !0 };
      case DeviceTypes.Wearable:
        return { isWearable: !0 };
      case DeviceTypes.Browser:
        return { isBrowser: !0 };
      case DeviceTypes.Embedded:
        return { isEmbedded: !0 };
      default:
        return InitialDeviceTypes;
    }
  },
  setUserAgent = function (e) {
    return setUa(e);
  },
  setDefaults = function (e) {
    return (
      e ||
      (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'none')
    );
  },
  getNavigatorInstance = function () {
    return (
      !('undefined' == typeof window || (!window.navigator && !navigator)) &&
      (window.navigator || navigator)
    );
  },
  isIOS13Check = function (e) {
    var t = getNavigatorInstance();
    return (
      t &&
      t.platform &&
      (-1 !== t.platform.indexOf(e) ||
        ('MacIntel' === t.platform && 1 < t.maxTouchPoints && !window.MSStream))
    );
  },
  browserPayload = function (e, t, r, n, i) {
    return {
      isBrowser: e,
      browserMajorVersion: setDefaults(t.major),
      browserFullVersion: setDefaults(t.version),
      browserName: setDefaults(t.name),
      engineName: setDefaults(r.name),
      engineVersion: setDefaults(r.version),
      osName: setDefaults(n.name),
      osVersion: setDefaults(n.version),
      userAgent: setDefaults(i),
    };
  },
  mobilePayload = function (e, t, r, n) {
    return _objectSpread2({}, e, {
      vendor: setDefaults(t.vendor),
      model: setDefaults(t.model),
      os: setDefaults(r.name),
      osVersion: setDefaults(r.version),
      ua: setDefaults(n),
    });
  },
  smartTvPayload = function (e, t, r, n) {
    return {
      isSmartTV: e,
      engineName: setDefaults(t.name),
      engineVersion: setDefaults(t.version),
      osName: setDefaults(r.name),
      osVersion: setDefaults(r.version),
      userAgent: setDefaults(n),
    };
  },
  consolePayload = function (e, t, r, n) {
    return {
      isConsole: e,
      engineName: setDefaults(t.name),
      engineVersion: setDefaults(t.version),
      osName: setDefaults(r.name),
      osVersion: setDefaults(r.version),
      userAgent: setDefaults(n),
    };
  },
  wearablePayload = function (e, t, r, n) {
    return {
      isWearable: e,
      engineName: setDefaults(t.name),
      engineVersion: setDefaults(t.version),
      osName: setDefaults(r.name),
      osVersion: setDefaults(r.version),
      userAgent: setDefaults(n),
    };
  },
  embeddedPayload = function (e, t, r, n, i) {
    return {
      isEmbedded: e,
      vendor: setDefaults(t.vendor),
      model: setDefaults(t.model),
      engineName: setDefaults(r.name),
      engineVersion: setDefaults(r.version),
      osName: setDefaults(n.name),
      osVersion: setDefaults(n.version),
      userAgent: setDefaults(i),
    };
  };
function deviceDetect(e) {
  var e = e ? parseUserAgent(e) : UAHelper,
    t = e.device,
    r = e.browser,
    n = e.engine,
    i = e.os,
    e = e.ua,
    o = checkDeviceType(t.type),
    a = o.isBrowser,
    s = o.isMobile,
    u = o.isTablet,
    c = o.isSmartTV,
    l = o.isConsole,
    f = o.isWearable,
    p = o.isEmbedded;
  return a
    ? browserPayload(a, r, n, i, e)
    : c
    ? smartTvPayload(c, n, i, e)
    : l
    ? consolePayload(l, n, i, e)
    : s || u
    ? mobilePayload(o, t, i, e)
    : f
    ? wearablePayload(f, n, i, e)
    : p
    ? embeddedPayload(p, t, n, i, e)
    : void 0;
}
var isMobileType = function (e) {
    return e.type === DeviceTypes.Mobile;
  },
  isTabletType = function (e) {
    return e.type === DeviceTypes.Tablet;
  },
  isMobileAndTabletType = function (e) {
    e = e.type;
    return e === DeviceTypes.Mobile || e === DeviceTypes.Tablet;
  },
  isSmartTVType = function (e) {
    return e.type === DeviceTypes.SmartTv;
  },
  isBrowserType = function (e) {
    return e.type === DeviceTypes.Browser;
  },
  isWearableType = function (e) {
    return e.type === DeviceTypes.Wearable;
  },
  isConsoleType = function (e) {
    return e.type === DeviceTypes.Console;
  },
  isEmbeddedType = function (e) {
    return e.type === DeviceTypes.Embedded;
  },
  getMobileVendor = function (e) {
    e = e.vendor;
    return setDefaults(e);
  },
  getMobileModel = function (e) {
    e = e.model;
    return setDefaults(e);
  },
  getDeviceType = function (e) {
    e = e.type;
    return setDefaults(e, 'browser');
  },
  isAndroidType = function (e) {
    return e.name === OsTypes.Android;
  },
  isWindowsType = function (e) {
    return e.name === OsTypes.Windows;
  },
  isMacOsType = function (e) {
    return e.name === OsTypes.MAC_OS;
  },
  isWinPhoneType = function (e) {
    return e.name === OsTypes.WindowsPhone;
  },
  isIOSType = function (e) {
    return e.name === OsTypes.IOS;
  },
  getOsVersion = function (e) {
    e = e.version;
    return setDefaults(e);
  },
  getOsName = function (e) {
    e = e.name;
    return setDefaults(e);
  },
  isChromeType = function (e) {
    return e.name === BrowserTypes.Chrome;
  },
  isFirefoxType = function (e) {
    return e.name === BrowserTypes.Firefox;
  },
  isChromiumType = function (e) {
    return e.name === BrowserTypes.Chromium;
  },
  isEdgeType = function (e) {
    return e.name === BrowserTypes.Edge;
  },
  isYandexType = function (e) {
    return e.name === BrowserTypes.Yandex;
  },
  isSafariType = function (e) {
    e = e.name;
    return e === BrowserTypes.Safari || e === BrowserTypes.MobileSafari;
  },
  isMobileSafariType = function (e) {
    return e.name === BrowserTypes.MobileSafari;
  },
  isOperaType = function (e) {
    return e.name === BrowserTypes.Opera;
  },
  isIEType = function (e) {
    e = e.name;
    return e === BrowserTypes.InternetExplorer || e === BrowserTypes.Ie;
  },
  isMIUIType = function (e) {
    return e.name === BrowserTypes.MIUI;
  },
  isSamsungBrowserType = function (e) {
    return e.name === BrowserTypes.SamsungBrowser;
  },
  getBrowserFullVersion = function (e) {
    e = e.version;
    return setDefaults(e);
  },
  getBrowserVersion = function (e) {
    e = e.major;
    return setDefaults(e);
  },
  getBrowserName = function (e) {
    e = e.name;
    return setDefaults(e);
  },
  getEngineName = function (e) {
    e = e.name;
    return setDefaults(e);
  },
  getEngineVersion = function (e) {
    e = e.version;
    return setDefaults(e);
  },
  isElectronType = function () {
    var e = getNavigatorInstance(),
      e = e && e.userAgent && e.userAgent.toLowerCase();
    return 'string' == typeof e && /electron/.test(e);
  },
  isEdgeChromiumType = function (e) {
    return 'string' == typeof e && -1 !== e.indexOf('Edg/');
  },
  getIOS13 = function () {
    var e = getNavigatorInstance();
    return (
      e &&
      (/iPad|iPhone|iPod/.test(e.platform) ||
        ('MacIntel' === e.platform && 1 < e.maxTouchPoints)) &&
      !window.MSStream
    );
  },
  getIPad13 = function () {
    return isIOS13Check('iPad');
  },
  getIphone13 = function () {
    return isIOS13Check('iPhone');
  },
  getIPod13 = function () {
    return isIOS13Check('iPod');
  },
  getUseragent = function (e) {
    return setDefaults(e);
  };
function buildSelectorsObject(e) {
  var e = e || UAHelper,
    t = e.device,
    r = e.browser,
    n = e.os,
    i = e.engine,
    e = e.ua;
  return {
    isSmartTV: isSmartTVType(t),
    isConsole: isConsoleType(t),
    isWearable: isWearableType(t),
    isEmbedded: isEmbeddedType(t),
    isMobileSafari: isMobileSafariType(r) || getIPad13(),
    isChromium: isChromiumType(r),
    isMobile: isMobileAndTabletType(t) || getIPad13(),
    isMobileOnly: isMobileType(t),
    isTablet: isTabletType(t) || getIPad13(),
    isBrowser: isBrowserType(t),
    isDesktop: isBrowserType(t),
    isAndroid: isAndroidType(n),
    isWinPhone: isWinPhoneType(n),
    isIOS: isIOSType(n) || getIPad13(),
    isChrome: isChromeType(r),
    isFirefox: isFirefoxType(r),
    isSafari: isSafariType(r),
    isOpera: isOperaType(r),
    isIE: isIEType(r),
    osVersion: getOsVersion(n),
    osName: getOsName(n),
    fullBrowserVersion: getBrowserFullVersion(r),
    browserVersion: getBrowserVersion(r),
    browserName: getBrowserName(r),
    mobileVendor: getMobileVendor(t),
    mobileModel: getMobileModel(t),
    engineName: getEngineName(i),
    engineVersion: getEngineVersion(i),
    getUA: getUseragent(e),
    isEdge: isEdgeType(r) || isEdgeChromiumType(e),
    isYandex: isYandexType(r),
    deviceType: getDeviceType(t),
    isIOS13: getIOS13(),
    isIPad13: getIPad13(),
    isIPhone13: getIphone13(),
    isIPod13: getIPod13(),
    isElectron: isElectronType(),
    isEdgeChromium: isEdgeChromiumType(e),
    isLegacyEdge: isEdgeType(r) && !isEdgeChromiumType(e),
    isWindows: isWindowsType(n),
    isMacOs: isMacOsType(n),
    isMIUI: isMIUIType(r),
    isSamsungBrowser: isSamsungBrowserType(r),
  };
}
var isSmartTV = isSmartTVType(device),
  isConsole = isConsoleType(device),
  isWearable = isWearableType(device),
  isEmbedded = isEmbeddedType(device),
  isMobileSafari = isMobileSafariType(browser) || getIPad13(),
  isChromium = isChromiumType(browser),
  isMobile = isMobileAndTabletType(device) || getIPad13(),
  isMobileOnly = isMobileType(device),
  isTablet = isTabletType(device) || getIPad13(),
  isBrowser$1 = isBrowserType(device),
  isDesktop = isBrowserType(device),
  isAndroid = isAndroidType(os),
  isWinPhone = isWinPhoneType(os),
  isIOS = isIOSType(os) || getIPad13(),
  isChrome = isChromeType(browser),
  isFirefox = isFirefoxType(browser),
  isSafari = isSafariType(browser),
  isOpera = isOperaType(browser),
  isIE = isIEType(browser),
  osVersion = getOsVersion(os),
  osName = getOsName(os),
  fullBrowserVersion = getBrowserFullVersion(browser),
  browserVersion = getBrowserVersion(browser),
  browserName = getBrowserName(browser),
  mobileVendor = getMobileVendor(device),
  mobileModel = getMobileModel(device),
  engineName = getEngineName(engine),
  engineVersion = getEngineVersion(engine),
  getUA = getUseragent(ua),
  isEdge = isEdgeType(browser) || isEdgeChromiumType(ua),
  isYandex = isYandexType(browser),
  deviceType = getDeviceType(device),
  isIOS13 = getIOS13(),
  isIPad13 = getIPad13(),
  isIPhone13 = getIphone13(),
  isIPod13 = getIPod13(),
  isElectron = isElectronType(),
  isEdgeChromium = isEdgeChromiumType(ua),
  isLegacyEdge = isEdgeType(browser) && !isEdgeChromiumType(ua),
  isWindows = isWindowsType(os),
  isMacOs = isMacOsType(os),
  isMIUI = isMIUIType(browser),
  isSamsungBrowser = isSamsungBrowserType(browser),
  getSelectorsByUserAgent = function (e) {
    if (e && 'string' == typeof e)
      return buildSelectorsObject({
        device: (e = parseUserAgent(e)).device,
        browser: e.browser,
        os: e.os,
        engine: e.engine,
        ua: e.ua,
      });
    console.error('No valid user agent string was provided');
  },
  AndroidView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isAndroid
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  },
  BrowserView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isBrowser$1
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  },
  IEView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isIE
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  },
  IOSView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isIOS
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  },
  MobileView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isMobile
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  },
  TabletView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isTablet
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  },
  WinPhoneView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isWinPhone
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  },
  MobileOnlyView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      e =
        (e.viewClassName,
        e.style,
        _objectWithoutProperties(e, [
          'renderWithFragment',
          'children',
          'viewClassName',
          'style',
        ]));
    return isMobileOnly
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  },
  SmartTVView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isSmartTV
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  },
  ConsoleView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isConsole
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  },
  WearableView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isWearable
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  },
  CustomView = function (e) {
    var t = e.renderWithFragment,
      r = e.children,
      n = (e.viewClassName, e.style, e.condition),
      e = _objectWithoutProperties(e, [
        'renderWithFragment',
        'children',
        'viewClassName',
        'style',
        'condition',
      ]);
    return n
      ? t
        ? React__default.createElement(React.Fragment, null, r)
        : React__default.createElement('div', e, r)
      : null;
  };
function withOrientationChange(e) {
  return (function () {
    function t(e) {
      return (
        _classCallCheck(this, t),
        ((e = _possibleConstructorReturn(
          this,
          _getPrototypeOf(t).call(this, e)
        )).isEventListenerAdded = !1),
        (e.handleOrientationChange = e.handleOrientationChange.bind(
          _assertThisInitialized(e)
        )),
        (e.onOrientationChange = e.onOrientationChange.bind(
          _assertThisInitialized(e)
        )),
        (e.onPageLoad = e.onPageLoad.bind(_assertThisInitialized(e))),
        (e.state = { isLandscape: !1, isPortrait: !1 }),
        e
      );
    }
    return (
      _inherits(t, React__default.Component),
      _createClass(t, [
        {
          key: 'handleOrientationChange',
          value: function () {
            this.isEventListenerAdded || (this.isEventListenerAdded = !0);
            var e = window.innerWidth > window.innerHeight ? 90 : 0;
            this.setState({ isPortrait: 0 == e, isLandscape: 90 == e });
          },
        },
        {
          key: 'onOrientationChange',
          value: function () {
            this.handleOrientationChange();
          },
        },
        {
          key: 'onPageLoad',
          value: function () {
            this.handleOrientationChange();
          },
        },
        {
          key: 'componentDidMount',
          value: function () {
            void 0 !==
              ('undefined' == typeof window ? 'undefined' : _typeof(window)) &&
              isMobile &&
              (this.isEventListenerAdded
                ? window.removeEventListener('load', this.onPageLoad, !1)
                : (this.handleOrientationChange(),
                  window.addEventListener('load', this.onPageLoad, !1)),
              window.addEventListener('resize', this.onOrientationChange, !1));
          },
        },
        {
          key: 'componentWillUnmount',
          value: function () {
            window.removeEventListener('resize', this.onOrientationChange, !1);
          },
        },
        {
          key: 'render',
          value: function () {
            return React__default.createElement(
              e,
              _extends({}, this.props, {
                isLandscape: this.state.isLandscape,
                isPortrait: this.state.isPortrait,
              })
            );
          },
        },
      ]),
      t
    );
  })();
}
function useMobileOrientation() {
  var e = _slicedToArray(
      React.useState(function () {
        var e = window.innerWidth > window.innerHeight ? 90 : 0;
        return {
          isPortrait: 0 == e,
          isLandscape: 90 == e,
          orientation: 0 == e ? 'portrait' : 'landscape',
        };
      }),
      2
    ),
    t = e[0],
    r = e[1],
    n = React.useCallback(
      function () {
        var e = window.innerWidth > window.innerHeight ? 90 : 0,
          e = {
            isPortrait: 0 == e,
            isLandscape: 90 == e,
            orientation: 0 == e ? 'portrait' : 'landscape',
          };
        t.orientation !== e.orientation && r(e);
      },
      [t.orientation]
    );
  return (
    React.useEffect(
      function () {
        return (
          void 0 !==
            ('undefined' == typeof window ? 'undefined' : _typeof(window)) &&
            isMobile &&
            (n(),
            window.addEventListener('load', n, !1),
            window.addEventListener('resize', n, !1)),
          function () {
            window.removeEventListener('resize', n, !1),
              window.removeEventListener('load', n, !1);
          }
        );
      },
      [n]
    ),
    t
  );
}
function useDeviceData(e) {
  e = e || window.navigator.userAgent;
  return parseUserAgent(e);
}
function useDeviceSelectors(e) {
  e = useDeviceData(e || window.navigator.userAgent);
  return [buildSelectorsObject(e), e];
}
(lib.AndroidView = AndroidView),
  (lib.BrowserTypes = BrowserTypes),
  (lib.BrowserView = BrowserView),
  (lib.ConsoleView = ConsoleView),
  (lib.CustomView = CustomView),
  (lib.IEView = IEView),
  (lib.IOSView = IOSView),
  (lib.MobileOnlyView = MobileOnlyView),
  (lib.MobileView = MobileView),
  (lib.OsTypes = OsTypes),
  (lib.SmartTVView = SmartTVView),
  (lib.TabletView = TabletView),
  (lib.WearableView = WearableView),
  (lib.WinPhoneView = WinPhoneView),
  (lib.browserName = browserName),
  (lib.browserVersion = browserVersion),
  (lib.deviceDetect = deviceDetect),
  (lib.deviceType = deviceType),
  (lib.engineName = engineName),
  (lib.engineVersion = engineVersion),
  (lib.fullBrowserVersion = fullBrowserVersion),
  (lib.getSelectorsByUserAgent = getSelectorsByUserAgent),
  (lib.getUA = getUA),
  (lib.isAndroid = isAndroid),
  (lib.isBrowser = isBrowser$1),
  (lib.isChrome = isChrome),
  (lib.isChromium = isChromium),
  (lib.isConsole = isConsole),
  (lib.isDesktop = isDesktop),
  (lib.isEdge = isEdge),
  (lib.isEdgeChromium = isEdgeChromium),
  (lib.isElectron = isElectron),
  (lib.isEmbedded = isEmbedded),
  (lib.isFirefox = isFirefox),
  (lib.isIE = isIE),
  (lib.isIOS = isIOS),
  (lib.isIOS13 = isIOS13),
  (lib.isIPad13 = isIPad13),
  (lib.isIPhone13 = isIPhone13),
  (lib.isIPod13 = isIPod13),
  (lib.isLegacyEdge = isLegacyEdge),
  (lib.isMIUI = isMIUI),
  (lib.isMacOs = isMacOs),
  (lib.isMobile = isMobile),
  (lib.isMobileOnly = isMobileOnly),
  (lib.isMobileSafari = isMobileSafari),
  (lib.isOpera = isOpera),
  (lib.isSafari = isSafari),
  (lib.isSamsungBrowser = isSamsungBrowser),
  (lib.isSmartTV = isSmartTV),
  (lib.isTablet = isTablet),
  (lib.isWearable = isWearable),
  (lib.isWinPhone = isWinPhone),
  (lib.isWindows = isWindows),
  (lib.isYandex = isYandex),
  (lib.mobileModel = mobileModel),
  (lib.mobileVendor = mobileVendor),
  (lib.osName = osName),
  (lib.osVersion = osVersion),
  (lib.parseUserAgent = parseUserAgent),
  (lib.setUserAgent = setUserAgent),
  (lib.useDeviceData = useDeviceData),
  (lib.useDeviceSelectors = useDeviceSelectors),
  (lib.useMobileOrientation = useMobileOrientation),
  (lib.withOrientationChange = withOrientationChange);
const isValidUrl = (e) => {
    try {
      return new URL(e), !0;
    } catch (e) {
      return !1;
    }
  },
  fetchSvgContent = (i) =>
    new Promise((t, r) => {
      const e = new XMLHttpRequest(),
        n = new FileReader();
      isValidUrl(i)
        ? (e.open('GET', i),
          (e.responseType = 'blob'),
          (e.onload = () => {
            200 === e.status
              ? (n.readAsText(e.response),
                (n.onloadend = () => {
                  var e = new DOMParser().parseFromString(
                    n.result,
                    'text/xml'
                  ).documentElement;
                  t(e);
                }))
              : r('Cannot parse content');
          }),
          (e.onerror = (e) => {
            r(e);
          }),
          e.send())
        : (n.readAsDataURL(b64toBlob(i, 'image/svg+xml')),
          (n.onloadend = () => {
            var e = new DOMParser().parseFromString(
              n.result,
              'text/xml'
            ).documentElement;
            t(e);
          }));
    }),
  b64toBlob = (e, t = '', r = 512) => {
    var n = atob(e),
      i = [];
    for (let e = 0; e < n.length; e += r) {
      var o = n.slice(e, e + r),
        a = new Array(o.length);
      for (let e = 0; e < o.length; e++) a[e] = o.charCodeAt(e);
      var s = new Uint8Array(a);
      i.push(s);
    }
    return new Blob(i, { type: t });
  };
var lodash = { exports: {} },
  lodashExports =
    (lodash.exports,
    !(function (C, $) {
      !function () {
        var Bo,
          Vo = 'Expected a function',
          va = '__lodash_hash_undefined__',
          ya = '__lodash_placeholder__',
          Fo = 128,
          Uo = 9007199254740991,
          wa = NaN,
          qo = 4294967295,
          _a = [
            ['ary', Fo],
            ['bind', 1],
            ['bindKey', 2],
            ['curry', 8],
            ['curryRight', 16],
            ['flip', 512],
            ['partial', 32],
            ['partialRight', 64],
            ['rearg', 256],
          ],
          Go = '[object Arguments]',
          xa = '[object Array]',
          Ko = '[object Boolean]',
          Ho = '[object Date]',
          Ea = '[object Error]',
          Sa = '[object Function]',
          Ia = '[object GeneratorFunction]',
          Zo = '[object Map]',
          Yo = '[object Number]',
          Jo = '[object Object]',
          Ta = '[object Promise]',
          Xo = '[object RegExp]',
          Qo = '[object Set]',
          ea = '[object String]',
          Oa = '[object Symbol]',
          ta = '[object WeakMap]',
          Na = '[object ArrayBuffer]',
          ra = '[object DataView]',
          Ca = '[object Float32Array]',
          $a = '[object Float64Array]',
          ja = '[object Int8Array]',
          ka = '[object Int16Array]',
          Aa = '[object Int32Array]',
          Pa = '[object Uint8Array]',
          Ra = '[object Uint8ClampedArray]',
          za = '[object Uint16Array]',
          La = '[object Uint32Array]',
          Ma = /\b__p \+= '';/g,
          Da = /\b(__p \+=) '' \+/g,
          Wa = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
          Ba = /&(?:amp|lt|gt|quot|#39);/g,
          Va = /[&<>"']/g,
          Fa = RegExp(Ba.source),
          Ua = RegExp(Va.source),
          qa = /<%-([\s\S]+?)%>/g,
          Ga = /<%([\s\S]+?)%>/g,
          Ka = /<%=([\s\S]+?)%>/g,
          Ha = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
          Za = /^\w*$/,
          Ya =
            /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
          Ja = /[\\^$.*+?()[\]{}|]/g,
          Xa = RegExp(Ja.source),
          Qa = /^\s+/,
          o = /\s/,
          es = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
          ts = /\{\n\/\* \[wrapped with (.+)\] \*/,
          rs = /,? & /,
          ns = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
          is = /[()=,{}\[\]\/\s]/,
          os = /\\(\\)?/g,
          as = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
          ss = /\w*$/,
          us = /^[-+]0x[0-9a-f]+$/i,
          cs = /^0b[01]+$/i,
          ls = /^\[object .+?Constructor\]$/,
          fs = /^0o[0-7]+$/i,
          ps = /^(?:0|[1-9]\d*)$/,
          hs = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
          ds = /($^)/,
          ms = /['\n\r\u2028\u2029\\]/g,
          a = '\\ud800-\\udfff',
          s = '\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff',
          u = '\\u2700-\\u27bf',
          e = 'a-z\\xdf-\\xf6\\xf8-\\xff',
          t = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
          c = '\\ufe0e\\ufe0f',
          l =
            '\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
          f = "['’]",
          r = '[' + a + ']',
          p = '[' + l + ']',
          h = '[' + s + ']',
          d = '[' + u + ']',
          m = '[' + e + ']',
          l = '[^' + a + l + '\\d+' + u + e + t + ']',
          u = '\\ud83c[\\udffb-\\udfff]',
          e = '[^' + a + ']',
          g = '(?:\\ud83c[\\udde6-\\uddff]){2}',
          n = '[\\ud800-\\udbff][\\udc00-\\udfff]',
          t = '[' + t + ']',
          b = '\\u200d',
          v = '(?:' + m + '|' + l + ')',
          l = '(?:' + t + '|' + l + ')',
          y = "(?:['’](?:d|ll|m|re|s|t|ve))?",
          w = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
          _ = '(?:' + h + '|' + u + ')' + '?',
          x = '[' + c + ']?',
          x =
            x +
            _ +
            ('(?:' + b + '(?:' + [e, g, n].join('|') + ')' + x + _ + ')*'),
          _ = '(?:' + [d, g, n].join('|') + ')' + x,
          d = '(?:' + [e + h + '?', h, g, n, r].join('|') + ')',
          gs = RegExp(f, 'g'),
          bs = RegExp(h, 'g'),
          E = RegExp(u + '(?=' + u + ')|' + d + x, 'g'),
          vs = RegExp(
            [
              t + '?' + m + '+' + y + '(?=' + [p, t, '$'].join('|') + ')',
              l + '+' + w + '(?=' + [p, t + v, '$'].join('|') + ')',
              t + '?' + v + '+' + y,
              t + '+' + w,
              '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
              '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
              '\\d+',
              _,
            ].join('|'),
            'g'
          ),
          S = RegExp('[' + b + a + s + c + ']'),
          ys =
            /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
          ws = [
            'Array',
            'Buffer',
            'DataView',
            'Date',
            'Error',
            'Float32Array',
            'Float64Array',
            'Function',
            'Int8Array',
            'Int16Array',
            'Int32Array',
            'Map',
            'Math',
            'Object',
            'Promise',
            'RegExp',
            'Set',
            'String',
            'Symbol',
            'TypeError',
            'Uint8Array',
            'Uint8ClampedArray',
            'Uint16Array',
            'Uint32Array',
            'WeakMap',
            '_',
            'clearTimeout',
            'isFinite',
            'parseInt',
            'setTimeout',
          ],
          _s = -1,
          na = {},
          ia =
            ((na[Ca] =
              na[$a] =
              na[ja] =
              na[ka] =
              na[Aa] =
              na[Pa] =
              na[Ra] =
              na[za] =
              na[La] =
                !0),
            (na[Go] =
              na[xa] =
              na[Na] =
              na[Ko] =
              na[ra] =
              na[Ho] =
              na[Ea] =
              na[Sa] =
              na[Zo] =
              na[Yo] =
              na[Jo] =
              na[Xo] =
              na[Qo] =
              na[ea] =
              na[ta] =
                !1),
            {}),
          I =
            ((ia[Go] =
              ia[xa] =
              ia[Na] =
              ia[ra] =
              ia[Ko] =
              ia[Ho] =
              ia[Ca] =
              ia[$a] =
              ia[ja] =
              ia[ka] =
              ia[Aa] =
              ia[Zo] =
              ia[Yo] =
              ia[Jo] =
              ia[Xo] =
              ia[Qo] =
              ia[ea] =
              ia[Oa] =
              ia[Pa] =
              ia[Ra] =
              ia[za] =
              ia[La] =
                !0),
            (ia[Ea] = ia[Sa] = ia[ta] = !1),
            {
              '\\': '\\',
              "'": "'",
              '\n': 'n',
              '\r': 'r',
              '\u2028': 'u2028',
              '\u2029': 'u2029',
            }),
          xs = parseFloat,
          Es = parseInt,
          e =
            'object' == typeof commonjsGlobal &&
            commonjsGlobal &&
            commonjsGlobal.Object === Object &&
            commonjsGlobal,
          g = 'object' == typeof self && self && self.Object === Object && self,
          oa = e || g || Function('return this')(),
          n = $ && !$.nodeType && $,
          i = n && C && !C.nodeType && C,
          Ss = i && i.exports === n,
          T = Ss && e.process,
          r = (function () {
            try {
              var e = i && i.require && i.require('util').types;
              return e ? e : T && T.binding && T.binding('util');
            } catch (e) {}
          })(),
          Is = r && r.isArrayBuffer,
          Ts = r && r.isDate,
          Os = r && r.isMap,
          Ns = r && r.isRegExp,
          Cs = r && r.isSet,
          $s = r && r.isTypedArray;
        function aa(e, t, r) {
          switch (r.length) {
            case 0:
              return e.call(t);
            case 1:
              return e.call(t, r[0]);
            case 2:
              return e.call(t, r[0], r[1]);
            case 3:
              return e.call(t, r[0], r[1], r[2]);
          }
          return e.apply(t, r);
        }
        function js(e, t, r, n) {
          for (var i = -1, o = null == e ? 0 : e.length; ++i < o; ) {
            var a = e[i];
            t(n, a, r(a), e);
          }
          return n;
        }
        function sa(e, t) {
          for (
            var r = -1, n = null == e ? 0 : e.length;
            ++r < n && !1 !== t(e[r], r, e);

          );
          return e;
        }
        function ks(e, t) {
          for (var r = null == e ? 0 : e.length; r-- && !1 !== t(e[r], r, e); );
          return e;
        }
        function As(e, t) {
          for (var r = -1, n = null == e ? 0 : e.length; ++r < n; )
            if (!t(e[r], r, e)) return !1;
          return !0;
        }
        function ua(e, t) {
          for (
            var r = -1, n = null == e ? 0 : e.length, i = 0, o = [];
            ++r < n;

          ) {
            var a = e[r];
            t(a, r, e) && (o[i++] = a);
          }
          return o;
        }
        function Ps(e, t) {
          return !!(null == e ? 0 : e.length) && -1 < fa(e, t, 0);
        }
        function Rs(e, t, r) {
          for (var n = -1, i = null == e ? 0 : e.length; ++n < i; )
            if (r(t, e[n])) return !0;
          return !1;
        }
        function ca(e, t) {
          for (
            var r = -1, n = null == e ? 0 : e.length, i = Array(n);
            ++r < n;

          )
            i[r] = t(e[r], r, e);
          return i;
        }
        function la(e, t) {
          for (var r = -1, n = t.length, i = e.length; ++r < n; )
            e[i + r] = t[r];
          return e;
        }
        function zs(e, t, r, n) {
          var i = -1,
            o = null == e ? 0 : e.length;
          for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
          return r;
        }
        function Ls(e, t, r, n) {
          var i = null == e ? 0 : e.length;
          for (n && i && (r = e[--i]); i--; ) r = t(r, e[i], i, e);
          return r;
        }
        function Ms(e, t) {
          for (var r = -1, n = null == e ? 0 : e.length; ++r < n; )
            if (t(e[r], r, e)) return !0;
          return !1;
        }
        var O = Us('length');
        function Ds(e, n, t) {
          var i;
          return (
            t(e, function (e, t, r) {
              if (n(e, t, r)) return (i = t), !1;
            }),
            i
          );
        }
        function Ws(e, t, r, n) {
          for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
            if (t(e[o], o, e)) return o;
          return -1;
        }
        function fa(e, t, r) {
          if (t != t) return Ws(e, Vs, r);
          for (var n = e, i = t, o = r - 1, a = n.length; ++o < a; )
            if (n[o] === i) return o;
          return -1;
        }
        function Bs(e, t, r, n) {
          for (var i = r - 1, o = e.length; ++i < o; ) if (n(e[i], t)) return i;
          return -1;
        }
        function Vs(e) {
          return e != e;
        }
        function Fs(e, t) {
          var r = null == e ? 0 : e.length;
          return r ? Gs(e, t) / r : wa;
        }
        function Us(t) {
          return function (e) {
            return null == e ? Bo : e[t];
          };
        }
        function N(t) {
          return function (e) {
            return null == t ? Bo : t[e];
          };
        }
        function qs(e, n, i, o, t) {
          return (
            t(e, function (e, t, r) {
              i = o ? ((o = !1), e) : n(i, e, t, r);
            }),
            i
          );
        }
        function Gs(e, t) {
          for (var r, n = -1, i = e.length; ++n < i; ) {
            var o = t(e[n]);
            o !== Bo && (r = r === Bo ? o : r + o);
          }
          return r;
        }
        function Ks(e, t) {
          for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
          return n;
        }
        function Hs(e) {
          return e && e.slice(0, ou(e) + 1).replace(Qa, '');
        }
        function pa(t) {
          return function (e) {
            return t(e);
          };
        }
        function Zs(t, e) {
          return ca(e, function (e) {
            return t[e];
          });
        }
        function Ys(e, t) {
          return e.has(t);
        }
        function Js(e, t) {
          for (var r = -1, n = e.length; ++r < n && -1 < fa(t, e[r], 0); );
          return r;
        }
        function Xs(e, t) {
          for (var r = e.length; r-- && -1 < fa(t, e[r], 0); );
          return r;
        }
        var Qs = N({
            À: 'A',
            Á: 'A',
            Â: 'A',
            Ã: 'A',
            Ä: 'A',
            Å: 'A',
            à: 'a',
            á: 'a',
            â: 'a',
            ã: 'a',
            ä: 'a',
            å: 'a',
            Ç: 'C',
            ç: 'c',
            Ð: 'D',
            ð: 'd',
            È: 'E',
            É: 'E',
            Ê: 'E',
            Ë: 'E',
            è: 'e',
            é: 'e',
            ê: 'e',
            ë: 'e',
            Ì: 'I',
            Í: 'I',
            Î: 'I',
            Ï: 'I',
            ì: 'i',
            í: 'i',
            î: 'i',
            ï: 'i',
            Ñ: 'N',
            ñ: 'n',
            Ò: 'O',
            Ó: 'O',
            Ô: 'O',
            Õ: 'O',
            Ö: 'O',
            Ø: 'O',
            ò: 'o',
            ó: 'o',
            ô: 'o',
            õ: 'o',
            ö: 'o',
            ø: 'o',
            Ù: 'U',
            Ú: 'U',
            Û: 'U',
            Ü: 'U',
            ù: 'u',
            ú: 'u',
            û: 'u',
            ü: 'u',
            Ý: 'Y',
            ý: 'y',
            ÿ: 'y',
            Æ: 'Ae',
            æ: 'ae',
            Þ: 'Th',
            þ: 'th',
            ß: 'ss',
            Ā: 'A',
            Ă: 'A',
            Ą: 'A',
            ā: 'a',
            ă: 'a',
            ą: 'a',
            Ć: 'C',
            Ĉ: 'C',
            Ċ: 'C',
            Č: 'C',
            ć: 'c',
            ĉ: 'c',
            ċ: 'c',
            č: 'c',
            Ď: 'D',
            Đ: 'D',
            ď: 'd',
            đ: 'd',
            Ē: 'E',
            Ĕ: 'E',
            Ė: 'E',
            Ę: 'E',
            Ě: 'E',
            ē: 'e',
            ĕ: 'e',
            ė: 'e',
            ę: 'e',
            ě: 'e',
            Ĝ: 'G',
            Ğ: 'G',
            Ġ: 'G',
            Ģ: 'G',
            ĝ: 'g',
            ğ: 'g',
            ġ: 'g',
            ģ: 'g',
            Ĥ: 'H',
            Ħ: 'H',
            ĥ: 'h',
            ħ: 'h',
            Ĩ: 'I',
            Ī: 'I',
            Ĭ: 'I',
            Į: 'I',
            İ: 'I',
            ĩ: 'i',
            ī: 'i',
            ĭ: 'i',
            į: 'i',
            ı: 'i',
            Ĵ: 'J',
            ĵ: 'j',
            Ķ: 'K',
            ķ: 'k',
            ĸ: 'k',
            Ĺ: 'L',
            Ļ: 'L',
            Ľ: 'L',
            Ŀ: 'L',
            Ł: 'L',
            ĺ: 'l',
            ļ: 'l',
            ľ: 'l',
            ŀ: 'l',
            ł: 'l',
            Ń: 'N',
            Ņ: 'N',
            Ň: 'N',
            Ŋ: 'N',
            ń: 'n',
            ņ: 'n',
            ň: 'n',
            ŋ: 'n',
            Ō: 'O',
            Ŏ: 'O',
            Ő: 'O',
            ō: 'o',
            ŏ: 'o',
            ő: 'o',
            Ŕ: 'R',
            Ŗ: 'R',
            Ř: 'R',
            ŕ: 'r',
            ŗ: 'r',
            ř: 'r',
            Ś: 'S',
            Ŝ: 'S',
            Ş: 'S',
            Š: 'S',
            ś: 's',
            ŝ: 's',
            ş: 's',
            š: 's',
            Ţ: 'T',
            Ť: 'T',
            Ŧ: 'T',
            ţ: 't',
            ť: 't',
            ŧ: 't',
            Ũ: 'U',
            Ū: 'U',
            Ŭ: 'U',
            Ů: 'U',
            Ű: 'U',
            Ų: 'U',
            ũ: 'u',
            ū: 'u',
            ŭ: 'u',
            ů: 'u',
            ű: 'u',
            ų: 'u',
            Ŵ: 'W',
            ŵ: 'w',
            Ŷ: 'Y',
            ŷ: 'y',
            Ÿ: 'Y',
            Ź: 'Z',
            Ż: 'Z',
            Ž: 'Z',
            ź: 'z',
            ż: 'z',
            ž: 'z',
            Ĳ: 'IJ',
            ĳ: 'ij',
            Œ: 'Oe',
            œ: 'oe',
            ŉ: "'n",
            ſ: 's',
          }),
          eu = N({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
          });
        function tu(e) {
          return '\\' + I[e];
        }
        function ha(e) {
          return S.test(e);
        }
        function ru(e) {
          var r = -1,
            n = Array(e.size);
          return (
            e.forEach(function (e, t) {
              n[++r] = [t, e];
            }),
            n
          );
        }
        function nu(t, r) {
          return function (e) {
            return t(r(e));
          };
        }
        function da(e, t) {
          for (var r = -1, n = e.length, i = 0, o = []; ++r < n; ) {
            var a = e[r];
            (a !== t && a !== ya) || ((e[r] = ya), (o[i++] = r));
          }
          return o;
        }
        function iu(e) {
          var t = -1,
            r = Array(e.size);
          return (
            e.forEach(function (e) {
              r[++t] = e;
            }),
            r
          );
        }
        function ma(e) {
          return (
            ha(e)
              ? function (e) {
                  var t = (E.lastIndex = 0);
                  for (; E.test(e); ) ++t;
                  return t;
                }
              : O
          )(e);
        }
        function ga(e) {
          return ha(e) ? e.match(E) || [] : e.split('');
        }
        function ou(e) {
          for (var t = e.length; t-- && o.test(e.charAt(t)); );
          return t;
        }
        var au = N({
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&quot;': '"',
          '&#39;': "'",
        });
        var ba = (function i(e) {
          var x = (e =
              null == e ? oa : ba.defaults(oa.Object(), e, ba.pick(oa, ws)))
              .Array,
            o = e.Date,
            k = e.Error,
            A = e.Function,
            P = e.Math,
            m = e.Object,
            R = e.RegExp,
            V = e.String,
            E = e.TypeError,
            F = x.prototype,
            U = A.prototype,
            q = m.prototype,
            G = e['__core-js_shared__'],
            K = U.toString,
            z = q.hasOwnProperty,
            H = 0,
            Z = (U = /[^.]+$/.exec((G && G.keys && G.keys.IE_PROTO) || ''))
              ? 'Symbol(src)_1.' + U
              : '',
            Y = q.toString,
            J = K.call(m),
            X = oa._,
            Q = R(
              '^' +
                K.call(z)
                  .replace(Ja, '\\$&')
                  .replace(
                    /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                    '$1.*?'
                  ) +
                '$'
            ),
            U = Ss ? e.Buffer : Bo,
            t = e.Symbol,
            ee = e.Uint8Array,
            te = U ? U.allocUnsafe : Bo,
            re = nu(m.getPrototypeOf, m),
            ne = m.create,
            ie = q.propertyIsEnumerable,
            oe = F.splice,
            ae = t ? t.isConcatSpreadable : Bo,
            se = t ? t.iterator : Bo,
            ue = t ? t.toStringTag : Bo,
            ce = (function () {
              try {
                var e = Jr(m, 'defineProperty');
                return e({}, '', {}), e;
              } catch (e) {}
            })(),
            le = e.clearTimeout !== oa.clearTimeout && e.clearTimeout,
            fe = o && o.now !== oa.Date.now && o.now,
            pe = e.setTimeout !== oa.setTimeout && e.setTimeout,
            he = P.ceil,
            de = P.floor,
            me = m.getOwnPropertySymbols,
            U = U ? U.isBuffer : Bo,
            ge = e.isFinite,
            be = F.join,
            ve = nu(m.keys, m),
            S = P.max,
            I = P.min,
            ye = o.now,
            we = e.parseInt,
            _e = P.random,
            xe = F.reverse,
            o = Jr(e, 'DataView'),
            Ee = Jr(e, 'Map'),
            Se = Jr(e, 'Promise'),
            Ie = Jr(e, 'Set'),
            e = Jr(e, 'WeakMap'),
            Te = Jr(m, 'create'),
            Oe = e && new e(),
            Ne = {},
            Ce = En(o),
            $e = En(Ee),
            je = En(Se),
            ke = En(Ie),
            Ae = En(e),
            t = t ? t.prototype : Bo,
            Pe = t ? t.valueOf : Bo,
            Re = t ? t.toString : Bo;
          function d(e) {
            if (B(e) && !W(e) && !(e instanceof b)) {
              if (e instanceof g) return e;
              if (z.call(e, '__wrapped__')) return Sn(e);
            }
            return new g(e);
          }
          var ze = function (e) {
            if (!_(e)) return {};
            if (ne) return ne(e);
            Le.prototype = e;
            e = new Le();
            return (Le.prototype = Bo), e;
          };
          function Le() {}
          function Me() {}
          function g(e, t) {
            (this.__wrapped__ = e),
              (this.__actions__ = []),
              (this.__chain__ = !!t),
              (this.__index__ = 0),
              (this.__values__ = Bo);
          }
          function b(e) {
            (this.__wrapped__ = e),
              (this.__actions__ = []),
              (this.__dir__ = 1),
              (this.__filtered__ = !1),
              (this.__iteratees__ = []),
              (this.__takeCount__ = qo),
              (this.__views__ = []);
          }
          function De(e) {
            var t = -1,
              r = null == e ? 0 : e.length;
            for (this.clear(); ++t < r; ) {
              var n = e[t];
              this.set(n[0], n[1]);
            }
          }
          function We(e) {
            var t = -1,
              r = null == e ? 0 : e.length;
            for (this.clear(); ++t < r; ) {
              var n = e[t];
              this.set(n[0], n[1]);
            }
          }
          function Be(e) {
            var t = -1,
              r = null == e ? 0 : e.length;
            for (this.clear(); ++t < r; ) {
              var n = e[t];
              this.set(n[0], n[1]);
            }
          }
          function Ve(e) {
            var t = -1,
              r = null == e ? 0 : e.length;
            for (this.__data__ = new Be(); ++t < r; ) this.add(e[t]);
          }
          function L(e) {
            e = this.__data__ = new We(e);
            this.size = e.size;
          }
          function Fe(e, t) {
            var r,
              n = W(e),
              i = !n && bi(e),
              o = !n && !i && yi(e),
              a = !n && !i && !o && $i(e),
              s = n || i || o || a,
              u = s ? Ks(e.length, V) : [],
              c = u.length;
            for (r in e)
              (!t && !z.call(e, r)) ||
                (s &&
                  ('length' == r ||
                    (o && ('offset' == r || 'parent' == r)) ||
                    (a &&
                      ('buffer' == r ||
                        'byteLength' == r ||
                        'byteOffset' == r)) ||
                    nn(r, c))) ||
                u.push(r);
            return u;
          }
          function Ue(e) {
            var t = e.length;
            return t ? e[Mt(0, t - 1)] : Bo;
          }
          function qe(e, t) {
            return yn(T(e), et(t, 0, e.length));
          }
          function Ge(e) {
            return yn(T(e));
          }
          function Ke(e, t, r) {
            ((r === Bo || D(e[t], r)) && (r !== Bo || t in e)) || Xe(e, t, r);
          }
          function He(e, t, r) {
            var n = e[t];
            (z.call(e, t) && D(n, r) && (r !== Bo || t in e)) || Xe(e, t, r);
          }
          function Ze(e, t) {
            for (var r = e.length; r--; ) if (D(e[r][0], t)) return r;
            return -1;
          }
          function Ye(e, n, i, o) {
            return (
              it(e, function (e, t, r) {
                n(o, e, i(e), r);
              }),
              o
            );
          }
          function Je(e, t) {
            return e && mr(t, C(t), e);
          }
          function Xe(e, t, r) {
            '__proto__' == t && ce
              ? ce(e, t, {
                  configurable: !0,
                  enumerable: !0,
                  value: r,
                  writable: !0,
                })
              : (e[t] = r);
          }
          function Qe(e, t) {
            for (var r = -1, n = t.length, i = x(n), o = null == e; ++r < n; )
              i[r] = o ? Bo : Ui(e, t[r]);
            return i;
          }
          function et(e, t, r) {
            return (e =
              e == e && (r !== Bo && (e = e <= r ? e : r), t !== Bo)
                ? t <= e
                  ? e
                  : t
                : e);
          }
          function v(r, n, i, e, t, o) {
            var a,
              s = 1 & n,
              u = 2 & n,
              c = 4 & n;
            if ((a = i ? (t ? i(r, e, t, o) : i(r)) : a) === Bo) {
              if (!_(r)) return r;
              var l,
                e = W(r);
              if (e) {
                if (
                  ((a = (function (e) {
                    var t = e.length,
                      r = new e.constructor(t);
                    t &&
                      'string' == typeof e[0] &&
                      z.call(e, 'index') &&
                      ((r.index = e.index), (r.input = e.input));
                    return r;
                  })(r)),
                  !s)
                )
                  return T(r, a);
              } else {
                var f = M(r),
                  p = f == Sa || f == Ia;
                if (yi(r)) return cr(r, s);
                if (f == Jo || f == Go || (p && !t)) {
                  if (((a = u || p ? {} : tn(r)), !s))
                    return u
                      ? ((h = p = r),
                        (h = (l = a) && mr(h, $(h), l)),
                        mr(p, Qr(p), h))
                      : ((p = Je(a, (l = r))), mr(l, Xr(l), p));
                } else {
                  if (!ia[f]) return t ? r : {};
                  a = (function (e, t, r) {
                    var n = e.constructor;
                    switch (t) {
                      case Na:
                        return lr(e);
                      case Ko:
                      case Ho:
                        return new n(+e);
                      case ra:
                        return (function (e, t) {
                          t = t ? lr(e.buffer) : e.buffer;
                          return new e.constructor(
                            t,
                            e.byteOffset,
                            e.byteLength
                          );
                        })(e, r);
                      case Ca:
                      case $a:
                      case ja:
                      case ka:
                      case Aa:
                      case Pa:
                      case Ra:
                      case za:
                      case La:
                        return fr(e, r);
                      case Zo:
                        return new n();
                      case Yo:
                      case ea:
                        return new n(e);
                      case Xo:
                        return (function (e) {
                          var t = new e.constructor(e.source, ss.exec(e));
                          return (t.lastIndex = e.lastIndex), t;
                        })(e);
                      case Qo:
                        return new n();
                      case Oa:
                        return (function (e) {
                          return Pe ? m(Pe.call(e)) : {};
                        })(e);
                    }
                  })(r, f, s);
                }
              }
              var h = (o = o || new L()).get(r);
              if (h) return h;
              o.set(r, a),
                Ni(r)
                  ? r.forEach(function (e) {
                      a.add(v(e, n, i, e, r, o));
                    })
                  : Si(r) &&
                    r.forEach(function (e, t) {
                      a.set(t, v(e, n, i, t, r, o));
                    });
              var d = e ? Bo : (c ? (u ? qr : Ur) : u ? $ : C)(r);
              sa(d || r, function (e, t) {
                d && (e = r[(t = e)]), He(a, t, v(e, n, i, t, r, o));
              });
            }
            return a;
          }
          function tt(e, t, r) {
            var n = r.length;
            if (null == e) return !n;
            for (e = m(e); n--; ) {
              var i = r[n],
                o = t[i],
                a = e[i];
              if ((a === Bo && !(i in e)) || !o(a)) return !1;
            }
            return !0;
          }
          function rt(e, t, r) {
            if ('function' != typeof e) throw new E(Vo);
            return mn(function () {
              e.apply(Bo, r);
            }, t);
          }
          function nt(e, t, r, n) {
            var i = -1,
              o = Ps,
              a = !0,
              s = e.length,
              u = [],
              c = t.length;
            if (s) {
              r && (t = ca(t, pa(r))),
                n
                  ? ((o = Rs), (a = !1))
                  : 200 <= t.length && ((o = Ys), (a = !1), (t = new Ve(t)));
              e: for (; ++i < s; ) {
                var l = e[i],
                  f = null == r ? l : r(l),
                  l = n || 0 !== l ? l : 0;
                if (a && f == f) {
                  for (var p = c; p--; ) if (t[p] === f) continue e;
                  u.push(l);
                } else o(t, f, n) || u.push(l);
              }
            }
            return u;
          }
          (d.templateSettings = {
            escape: qa,
            evaluate: Ga,
            interpolate: Ka,
            variable: '',
            imports: { _: d },
          }),
            ((d.prototype = Me.prototype).constructor = d),
            ((g.prototype = ze(Me.prototype)).constructor = g),
            ((b.prototype = ze(Me.prototype)).constructor = b),
            (De.prototype.clear = function () {
              (this.__data__ = Te ? Te(null) : {}), (this.size = 0);
            }),
            (De.prototype.delete = function (e) {
              return (
                (e = this.has(e) && delete this.__data__[e]),
                (this.size -= e ? 1 : 0),
                e
              );
            }),
            (De.prototype.get = function (e) {
              var t,
                r = this.__data__;
              return Te
                ? (t = r[e]) === va
                  ? Bo
                  : t
                : z.call(r, e)
                ? r[e]
                : Bo;
            }),
            (De.prototype.has = function (e) {
              var t = this.__data__;
              return Te ? t[e] !== Bo : z.call(t, e);
            }),
            (De.prototype.set = function (e, t) {
              var r = this.__data__;
              return (
                (this.size += this.has(e) ? 0 : 1),
                (r[e] = Te && t === Bo ? va : t),
                this
              );
            }),
            (We.prototype.clear = function () {
              (this.__data__ = []), (this.size = 0);
            }),
            (We.prototype.delete = function (e) {
              var t = this.__data__;
              return !(
                (e = Ze(t, e)) < 0 ||
                (e == t.length - 1 ? t.pop() : oe.call(t, e, 1), --this.size, 0)
              );
            }),
            (We.prototype.get = function (e) {
              var t = this.__data__;
              return (e = Ze(t, e)) < 0 ? Bo : t[e][1];
            }),
            (We.prototype.has = function (e) {
              return -1 < Ze(this.__data__, e);
            }),
            (We.prototype.set = function (e, t) {
              var r = this.__data__,
                n = Ze(r, e);
              return (
                n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this
              );
            }),
            (Be.prototype.clear = function () {
              (this.size = 0),
                (this.__data__ = {
                  hash: new De(),
                  map: new (Ee || We)(),
                  string: new De(),
                });
            }),
            (Be.prototype.delete = function (e) {
              return (e = Zr(this, e).delete(e)), (this.size -= e ? 1 : 0), e;
            }),
            (Be.prototype.get = function (e) {
              return Zr(this, e).get(e);
            }),
            (Be.prototype.has = function (e) {
              return Zr(this, e).has(e);
            }),
            (Be.prototype.set = function (e, t) {
              var r = Zr(this, e),
                n = r.size;
              return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
            }),
            (Ve.prototype.add = Ve.prototype.push =
              function (e) {
                return this.__data__.set(e, va), this;
              }),
            (Ve.prototype.has = function (e) {
              return this.__data__.has(e);
            }),
            (L.prototype.clear = function () {
              (this.__data__ = new We()), (this.size = 0);
            }),
            (L.prototype.delete = function (e) {
              var t = this.__data__,
                e = t.delete(e);
              return (this.size = t.size), e;
            }),
            (L.prototype.get = function (e) {
              return this.__data__.get(e);
            }),
            (L.prototype.has = function (e) {
              return this.__data__.has(e);
            }),
            (L.prototype.set = function (e, t) {
              var r = this.__data__;
              if (r instanceof We) {
                var n = r.__data__;
                if (!Ee || n.length < 199)
                  return n.push([e, t]), (this.size = ++r.size), this;
                r = this.__data__ = new Be(n);
              }
              return r.set(e, t), (this.size = r.size), this;
            });
          var it = vr(ft),
            ot = vr(pt, !0);
          function at(e, n) {
            var i = !0;
            return (
              it(e, function (e, t, r) {
                return (i = !!n(e, t, r));
              }),
              i
            );
          }
          function st(e, t, r) {
            for (var n = -1, i = e.length; ++n < i; ) {
              var o,
                a,
                s = e[n],
                u = t(s);
              null != u &&
                (o === Bo ? u == u && !y(u) : r(u, o)) &&
                ((o = u), (a = s));
            }
            return a;
          }
          function ut(e, n) {
            var i = [];
            return (
              it(e, function (e, t, r) {
                n(e, t, r) && i.push(e);
              }),
              i
            );
          }
          function u(e, t, r, n, i) {
            var o = -1,
              a = e.length;
            for (r = r || rn, i = i || []; ++o < a; ) {
              var s = e[o];
              0 < t && r(s)
                ? 1 < t
                  ? u(s, t - 1, r, n, i)
                  : la(i, s)
                : n || (i[i.length] = s);
            }
            return i;
          }
          var ct = yr(),
            lt = yr(!0);
          function ft(e, t) {
            return e && ct(e, t, C);
          }
          function pt(e, t) {
            return e && lt(e, t, C);
          }
          function ht(t, e) {
            return ua(e, function (e) {
              return _i(t[e]);
            });
          }
          function dt(e, t) {
            for (var r = 0, n = (t = or(t, e)).length; null != e && r < n; )
              e = e[xn(t[r++])];
            return r && r == n ? e : Bo;
          }
          function mt(e, t, r) {
            t = t(e);
            return W(e) ? t : la(t, r(e));
          }
          function r(e) {
            if (null == e)
              return e === Bo ? '[object Undefined]' : '[object Null]';
            if (ue && ue in m(e)) {
              var t = e,
                r = z.call(t, ue),
                n = t[ue];
              try {
                t[ue] = Bo;
                var i = !0;
              } catch (e) {}
              var o = Y.call(t);
              return i && (r ? (t[ue] = n) : delete t[ue]), o;
            }
            return Y.call(e);
          }
          function gt(e, t) {
            return t < e;
          }
          function bt(e, t) {
            return null != e && z.call(e, t);
          }
          function vt(e, t) {
            return null != e && t in m(e);
          }
          function yt(e, t, r) {
            for (
              var n = r ? Rs : Ps,
                i = e[0].length,
                o = e.length,
                a = o,
                s = x(o),
                u = 1 / 0,
                c = [];
              a--;

            ) {
              var l = e[a];
              a && t && (l = ca(l, pa(t))),
                (u = I(l.length, u)),
                (s[a] =
                  !r && (t || (120 <= i && 120 <= l.length))
                    ? new Ve(a && l)
                    : Bo);
            }
            var l = e[0],
              f = -1,
              p = s[0];
            e: for (; ++f < i && c.length < u; ) {
              var h = l[f],
                d = t ? t(h) : h,
                h = r || 0 !== h ? h : 0;
              if (!(p ? Ys(p, d) : n(c, d, r))) {
                for (a = o; --a; ) {
                  var m = s[a];
                  if (!(m ? Ys(m, d) : n(e[a], d, r))) continue e;
                }
                p && p.push(d), c.push(h);
              }
            }
            return c;
          }
          function wt(e, t, r) {
            t = null == (e = pn(e, (t = or(t, e)))) ? e : e[xn(n(t))];
            return null == t ? Bo : aa(t, e, r);
          }
          function _t(e) {
            return B(e) && r(e) == Go;
          }
          function xt(e, t, r, n, i) {
            if (e === t) return !0;
            if (null == e || null == t || (!B(e) && !B(t)))
              return e != e && t != t;
            var o = xt,
              a = W(e),
              s = W(t),
              u = a ? xa : M(e),
              s = s ? xa : M(t),
              c = (u = u == Go ? Jo : u) == Jo,
              l = (s = s == Go ? Jo : s) == Jo;
            if ((s = u == s) && yi(e)) {
              if (!yi(t)) return !1;
              c = !(a = !0);
            }
            if (s && !c) {
              i = i || new L();
              if (a || $i(e)) return Vr(e, t, r, n, o, i);
              else {
                var f = e;
                var p = t;
                var h = u;
                var d = r;
                var m = n;
                var g = o;
                var b = i;
                switch (h) {
                  case ra:
                    if (
                      f.byteLength != p.byteLength ||
                      f.byteOffset != p.byteOffset
                    )
                      return !1;
                    (f = f.buffer), (p = p.buffer);
                  case Na:
                    return f.byteLength == p.byteLength &&
                      g(new ee(f), new ee(p))
                      ? !0
                      : !1;
                  case Ko:
                  case Ho:
                  case Yo:
                    return D(+f, +p);
                  case Ea:
                    return f.name == p.name && f.message == p.message;
                  case Xo:
                  case ea:
                    return f == p + '';
                  case Zo:
                    var v = ru;
                  case Qo:
                    var y = 1 & d;
                    if (((v = v || iu), f.size != p.size && !y)) return !1;
                    y = b.get(f);
                    if (y) return y == p;
                    (d |= 2), b.set(f, p);
                    y = Vr(v(f), v(p), d, m, g, b);
                    return b.delete(f), y;
                  case Oa:
                    if (Pe) return Pe.call(f) == Pe.call(p);
                }
                return !1;
                return;
              }
            }
            if (!(1 & r)) {
              (a = c && z.call(e, '__wrapped__')),
                (u = l && z.call(t, '__wrapped__'));
              if (a || u)
                return (
                  (c = a ? e.value() : e),
                  (l = u ? t.value() : t),
                  (i = i || new L()),
                  o(c, l, r, n, i)
                );
            }
            if (s) {
              i = i || new L();
              var w = e,
                _ = t,
                x = r,
                E = n,
                S = o,
                I = i,
                T = 1 & x,
                O = Ur(w),
                N = O.length,
                a = Ur(_).length;
              if (N != a && !T) return !1;
              for (var C = N; C--; ) {
                var $ = O[C];
                if (!(T ? $ in _ : z.call(_, $))) return !1;
              }
              (a = I.get(w)), (u = I.get(_));
              if (a && u) return a == _ && u == w;
              for (var j = !0, k = (I.set(w, _), I.set(_, w), T); ++C < N; ) {
                $ = O[C];
                var A,
                  P = w[$],
                  R = _[$];
                if (
                  !((A = E
                    ? T
                      ? E(R, P, $, _, w, I)
                      : E(P, R, $, w, _, I)
                    : A) === Bo
                    ? P === R || S(P, R, x, E, I)
                    : A)
                ) {
                  j = !1;
                  break;
                }
                k = k || 'constructor' == $;
              }
              return (
                j &&
                  !k &&
                  ((a = w.constructor), (u = _.constructor), a != u) &&
                  'constructor' in w &&
                  'constructor' in _ &&
                  !(
                    'function' == typeof a &&
                    a instanceof a &&
                    'function' == typeof u &&
                    u instanceof u
                  ) &&
                  (j = !1),
                I.delete(w),
                I.delete(_),
                j
              );
            }
            return !1;
          }
          function Et(e, t, r, n) {
            var i = r.length,
              o = i,
              a = !n;
            if (null == e) return !o;
            for (e = m(e); i--; ) {
              var s = r[i];
              if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
            }
            for (; ++i < o; ) {
              var u = (s = r[i])[0],
                c = e[u],
                l = s[1];
              if (a && s[2]) {
                if (c === Bo && !(u in e)) return !1;
              } else {
                var f,
                  p = new L();
                if (
                  !((f = n ? n(c, l, u, e, t, p) : f) === Bo
                    ? xt(l, c, 3, n, p)
                    : f)
                )
                  return !1;
              }
            }
            return !0;
          }
          function St(e) {
            var t;
            return (
              !(!_(e) || ((t = e), Z && Z in t)) && (_i(e) ? Q : ls).test(En(e))
            );
          }
          function It(e) {
            return 'function' == typeof e
              ? e
              : null == e
              ? j
              : 'object' == typeof e
              ? W(e)
                ? jt(e[0], e[1])
                : $t(e)
              : No(e);
          }
          function Tt(e) {
            if (!un(e)) return ve(e);
            var t,
              r = [];
            for (t in m(e)) z.call(e, t) && 'constructor' != t && r.push(t);
            return r;
          }
          function Ot(e) {
            if (!_(e)) {
              var t = e,
                r = [];
              if (null != t) for (var n in m(t)) r.push(n);
              return r;
            }
            var i,
              o = un(e),
              a = [];
            for (i in e)
              ('constructor' != i || (!o && z.call(e, i))) && a.push(i);
            return a;
          }
          function Nt(e, t) {
            return e < t;
          }
          function Ct(e, n) {
            var i = -1,
              o = l(e) ? x(e.length) : [];
            return (
              it(e, function (e, t, r) {
                o[++i] = n(e, t, r);
              }),
              o
            );
          }
          function $t(t) {
            var r = Yr(t);
            return 1 == r.length && r[0][2]
              ? ln(r[0][0], r[0][1])
              : function (e) {
                  return e === t || Et(e, t, r);
                };
          }
          function jt(r, n) {
            return on(r) && cn(n)
              ? ln(xn(r), n)
              : function (e) {
                  var t = Ui(e, r);
                  return t === Bo && t === n ? qi(e, r) : xt(n, t, 3);
                };
          }
          function kt(m, g, b, v, y) {
            m !== g &&
              ct(
                g,
                function (e, t) {
                  var r, n, i, o, a, s, u, c, l, f, p, h, d;
                  (y = y || new L()),
                    _(e)
                      ? ((n = g),
                        (o = b),
                        (a = kt),
                        (s = v),
                        (u = y),
                        (p = hn((r = m), (i = t))),
                        (h = hn(n, i)),
                        (d = u.get(h))
                          ? Ke(r, i, d)
                          : ((d = s ? s(p, h, i + '', r, n, u) : Bo),
                            (n = d === Bo) &&
                              ((c = W(h)),
                              (l = !c && yi(h)),
                              (f = !c && !l && $i(h)),
                              (d = h),
                              c || l || f
                                ? (d = W(p)
                                    ? p
                                    : w(p)
                                    ? T(p)
                                    : l
                                    ? cr(h, !(n = !1))
                                    : f
                                    ? fr(h, !(n = !1))
                                    : [])
                                : Ti(h) || bi(h)
                                ? bi((d = p))
                                  ? (d = zi(p))
                                  : (_(p) && !_i(p)) || (d = tn(h))
                                : (n = !1)),
                            n && (u.set(h, d), a(d, h, o, s, u), u.delete(h)),
                            Ke(r, i, d)))
                      : ((c = v ? v(hn(m, t), e, t + '', m, g, y) : Bo),
                        Ke(m, t, (c = c === Bo ? e : c)));
                },
                $
              );
          }
          function At(e, t) {
            var r = e.length;
            if (r) return nn((t += t < 0 ? r : 0), r) ? e[t] : Bo;
          }
          function Pt(e, n, l) {
            n = n.length
              ? ca(n, function (t) {
                  return W(t)
                    ? function (e) {
                        return dt(e, 1 === t.length ? t[0] : t);
                      }
                    : t;
                })
              : [j];
            var i = -1;
            n = ca(n, pa(f()));
            var t = Ct(e, function (t, e, r) {
                return {
                  criteria: ca(n, function (e) {
                    return e(t);
                  }),
                  index: ++i,
                  value: t,
                };
              }),
              e = function (e, t) {
                for (
                  var r = l,
                    n = -1,
                    i = e.criteria,
                    o = t.criteria,
                    a = i.length,
                    s = r.length;
                  ++n < a;

                ) {
                  var u,
                    c = pr(i[n], o[n]);
                  if (c)
                    return s <= n
                      ? c
                      : ((u = r[n]), c * ('desc' == u ? -1 : 1));
                }
                return e.index - t.index;
              },
              r = t.length;
            for (t.sort(e); r--; ) t[r] = t[r].value;
            return t;
          }
          function Rt(e, t, r) {
            for (var n = -1, i = t.length, o = {}; ++n < i; ) {
              var a = t[n],
                s = dt(e, a);
              r(s, a) && Vt(o, or(a, e), s);
            }
            return o;
          }
          function zt(e, t, r, n) {
            var i = n ? Bs : fa,
              o = -1,
              a = t.length,
              s = e;
            for (e === t && (t = T(t)), r && (s = ca(e, pa(r))); ++o < a; )
              for (
                var u = 0, c = t[o], l = r ? r(c) : c;
                -1 < (u = i(s, l, u, n));

              )
                s !== e && oe.call(s, u, 1), oe.call(e, u, 1);
            return e;
          }
          function Lt(e, t) {
            for (var r = e ? t.length : 0, n = r - 1; r--; ) {
              var i,
                o = t[r];
              (r != n && o === i) ||
                (nn((i = o)) ? oe.call(e, o, 1) : Jt(e, o));
            }
          }
          function Mt(e, t) {
            return e + de(_e() * (t - e + 1));
          }
          function Dt(e, t) {
            var r = '';
            if (!(!e || t < 1 || Uo < t))
              for (; t % 2 && (r += e), (t = de(t / 2)) && (e += e), t; );
            return r;
          }
          function a(e, t) {
            return gn(fn(e, t, j), e + '');
          }
          function Wt(e) {
            return Ue(ro(e));
          }
          function Bt(e, t) {
            e = ro(e);
            return yn(e, et(t, 0, e.length));
          }
          function Vt(e, t, r, n) {
            if (_(e))
              for (
                var i = -1, o = (t = or(t, e)).length, a = o - 1, s = e;
                null != s && ++i < o;

              ) {
                var u,
                  c = xn(t[i]),
                  l = r;
                if (
                  '__proto__' === c ||
                  'constructor' === c ||
                  'prototype' === c
                )
                  return e;
                He(
                  s,
                  c,
                  (l =
                    i != a && ((u = s[c]), (l = n ? n(u, c, s) : Bo) === Bo)
                      ? _(u)
                        ? u
                        : nn(t[i + 1])
                        ? []
                        : {}
                      : l)
                ),
                  (s = s[c]);
              }
            return e;
          }
          var Ft = Oe
              ? function (e, t) {
                  return Oe.set(e, t), e;
                }
              : j,
            t = ce
              ? function (e, t) {
                  return ce(e, 'toString', {
                    configurable: !0,
                    enumerable: !1,
                    value: bo(t),
                    writable: !0,
                  });
                }
              : j;
          function Ut(e) {
            return yn(ro(e));
          }
          function s(e, t, r) {
            for (
              var n = -1,
                i = e.length,
                o =
                  ((r = i < r ? i : r) < 0 && (r += i),
                  (i =
                    r < (t = t < 0 ? (i < -t ? 0 : i + t) : t)
                      ? 0
                      : (r - t) >>> 0),
                  (t >>>= 0),
                  x(i));
              ++n < i;

            )
              o[n] = e[n + t];
            return o;
          }
          function qt(e, n) {
            var i;
            return (
              it(e, function (e, t, r) {
                return !(i = n(e, t, r));
              }),
              !!i
            );
          }
          function Gt(e, t, r) {
            var n = 0,
              i = null == e ? n : e.length;
            if ('number' == typeof t && t == t && i <= 2147483647) {
              for (; n < i; ) {
                var o = (n + i) >>> 1,
                  a = e[o];
                null !== a && !y(a) && (r ? a <= t : a < t)
                  ? (n = 1 + o)
                  : (i = o);
              }
              return i;
            }
            return Kt(e, t, j, r);
          }
          function Kt(e, t, r, n) {
            var i = 0,
              o = null == e ? 0 : e.length;
            if (0 === o) return 0;
            for (
              var a = (t = r(t)) != t, s = null === t, u = y(t), c = t === Bo;
              i < o;

            ) {
              var l = de((i + o) / 2),
                f = r(e[l]),
                p = f !== Bo,
                h = null === f,
                d = f == f,
                m = y(f),
                d = a
                  ? n || d
                  : c
                  ? d && (n || p)
                  : s
                  ? d && p && (n || !h)
                  : u
                  ? d && p && !h && (n || !m)
                  : !h && !m && (n ? f <= t : f < t);
              d ? (i = l + 1) : (o = l);
            }
            return I(o, 4294967294);
          }
          function Ht(e, t) {
            for (var r = -1, n = e.length, i = 0, o = []; ++r < n; ) {
              var a,
                s = e[r],
                u = t ? t(s) : s;
              (r && D(u, a)) || ((a = u), (o[i++] = 0 === s ? 0 : s));
            }
            return o;
          }
          function Zt(e) {
            return 'number' == typeof e ? e : y(e) ? wa : +e;
          }
          function c(e) {
            var t;
            return 'string' == typeof e
              ? e
              : W(e)
              ? ca(e, c) + ''
              : y(e)
              ? Re
                ? Re.call(e)
                : ''
              : '0' == (t = e + '') && 1 / e == -1 / 0
              ? '-0'
              : t;
          }
          function Yt(e, t, r) {
            var n = -1,
              i = Ps,
              o = e.length,
              a = !0,
              s = [],
              u = s;
            if (r) (a = !1), (i = Rs);
            else if (200 <= o) {
              var c = t ? null : zr(e);
              if (c) return iu(c);
              (a = !1), (i = Ys), (u = new Ve());
            } else u = t ? [] : s;
            e: for (; ++n < o; ) {
              var l = e[n],
                f = t ? t(l) : l,
                l = r || 0 !== l ? l : 0;
              if (a && f == f) {
                for (var p = u.length; p--; ) if (u[p] === f) continue e;
                t && u.push(f), s.push(l);
              } else i(u, f, r) || (u !== s && u.push(f), s.push(l));
            }
            return s;
          }
          function Jt(e, t) {
            return null == (e = pn(e, (t = or(t, e)))) || delete e[xn(n(t))];
          }
          function Xt(e, t, r, n) {
            return Vt(e, t, r(dt(e, t)), n);
          }
          function Qt(e, t, r, n) {
            for (
              var i = e.length, o = n ? i : -1;
              (n ? o-- : ++o < i) && t(e[o], o, e);

            );
            return r
              ? s(e, n ? 0 : o, n ? o + 1 : i)
              : s(e, n ? o + 1 : 0, n ? i : o);
          }
          function er(e, t) {
            var r = e;
            return zs(
              t,
              function (e, t) {
                return t.func.apply(t.thisArg, la([e], t.args));
              },
              (r = e instanceof b ? e.value() : r)
            );
          }
          function tr(e, t, r) {
            var n = e.length;
            if (n < 2) return n ? Yt(e[0]) : [];
            for (var i = -1, o = x(n); ++i < n; )
              for (var a = e[i], s = -1; ++s < n; )
                s != i && (o[i] = nt(o[i] || a, e[s], t, r));
            return Yt(u(o, 1), t, r);
          }
          function rr(e, t, r) {
            for (var n = -1, i = e.length, o = t.length, a = {}; ++n < i; ) {
              var s = n < o ? t[n] : Bo;
              r(a, e[n], s);
            }
            return a;
          }
          function nr(e) {
            return w(e) ? e : [];
          }
          function ir(e) {
            return 'function' == typeof e ? e : j;
          }
          function or(e, t) {
            return W(e) ? e : on(e, t) ? [e] : _n(h(e));
          }
          var ar = a;
          function sr(e, t, r) {
            var n = e.length;
            return (r = r === Bo ? n : r), !t && n <= r ? e : s(e, t, r);
          }
          var ur =
            le ||
            function (e) {
              return oa.clearTimeout(e);
            };
          function cr(e, t) {
            return t
              ? e.slice()
              : ((t = e.length),
                (t = te ? te(t) : new e.constructor(t)),
                e.copy(t),
                t);
          }
          function lr(e) {
            var t = new e.constructor(e.byteLength);
            return new ee(t).set(new ee(e)), t;
          }
          function fr(e, t) {
            t = t ? lr(e.buffer) : e.buffer;
            return new e.constructor(t, e.byteOffset, e.length);
          }
          function pr(e, t) {
            if (e !== t) {
              var r = e !== Bo,
                n = null === e,
                i = e == e,
                o = y(e),
                a = t !== Bo,
                s = null === t,
                u = t == t,
                c = y(t);
              if (
                (!s && !c && !o && t < e) ||
                (o && a && u && !s && !c) ||
                (n && a && u) ||
                (!r && u) ||
                !i
              )
                return 1;
              if (
                (!n && !o && !c && e < t) ||
                (c && r && i && !n && !o) ||
                (s && r && i) ||
                (!a && i) ||
                !u
              )
                return -1;
            }
            return 0;
          }
          function hr(e, t, r, n) {
            for (
              var i = -1,
                o = e.length,
                a = r.length,
                s = -1,
                u = t.length,
                c = S(o - a, 0),
                l = x(u + c),
                f = !n;
              ++s < u;

            )
              l[s] = t[s];
            for (; ++i < a; ) (f || i < o) && (l[r[i]] = e[i]);
            for (; c--; ) l[s++] = e[i++];
            return l;
          }
          function dr(e, t, r, n) {
            for (
              var i = -1,
                o = e.length,
                a = -1,
                s = r.length,
                u = -1,
                c = t.length,
                l = S(o - s, 0),
                f = x(l + c),
                p = !n;
              ++i < l;

            )
              f[i] = e[i];
            for (var h = i; ++u < c; ) f[h + u] = t[u];
            for (; ++a < s; ) (p || i < o) && (f[h + r[a]] = e[i++]);
            return f;
          }
          function T(e, t) {
            var r = -1,
              n = e.length;
            for (t = t || x(n); ++r < n; ) t[r] = e[r];
            return t;
          }
          function mr(e, t, r, n) {
            for (var i = !r, o = ((r = r || {}), -1), a = t.length; ++o < a; ) {
              var s = t[o],
                u = n ? n(r[s], e[s], s, r, e) : Bo;
              (i ? Xe : He)(r, s, (u = u === Bo ? e[s] : u));
            }
            return r;
          }
          function gr(i, o) {
            return function (e, t) {
              var r = W(e) ? js : Ye,
                n = o ? o() : {};
              return r(e, i, f(t, 2), n);
            };
          }
          function br(s) {
            return a(function (e, t) {
              var r = -1,
                n = t.length,
                i = 1 < n ? t[n - 1] : Bo,
                o = 2 < n ? t[2] : Bo,
                i = 3 < s.length && 'function' == typeof i ? (n--, i) : Bo;
              for (
                o && p(t[0], t[1], o) && ((i = n < 3 ? Bo : i), (n = 1)),
                  e = m(e);
                ++r < n;

              ) {
                var a = t[r];
                a && s(e, a, r, i);
              }
              return e;
            });
          }
          function vr(o, a) {
            return function (e, t) {
              if (null != e) {
                if (!l(e)) return o(e, t);
                for (
                  var r = e.length, n = a ? r : -1, i = m(e);
                  (a ? n-- : ++n < r) && !1 !== t(i[n], n, i);

                );
              }
              return e;
            };
          }
          function yr(u) {
            return function (e, t, r) {
              for (var n = -1, i = m(e), o = r(e), a = o.length; a--; ) {
                var s = o[u ? a : ++n];
                if (!1 === t(i[s], s, i)) break;
              }
              return e;
            };
          }
          function wr(n) {
            return function (e) {
              var t = ha((e = h(e))) ? ga(e) : Bo,
                r = t ? t[0] : e.charAt(0),
                t = t ? sr(t, 1).join('') : e.slice(1);
              return r[n]() + t;
            };
          }
          function _r(t) {
            return function (e) {
              return zs(ho(oo(e).replace(gs, '')), t, '');
            };
          }
          function xr(n) {
            return function () {
              var e = arguments;
              switch (e.length) {
                case 0:
                  return new n();
                case 1:
                  return new n(e[0]);
                case 2:
                  return new n(e[0], e[1]);
                case 3:
                  return new n(e[0], e[1], e[2]);
                case 4:
                  return new n(e[0], e[1], e[2], e[3]);
                case 5:
                  return new n(e[0], e[1], e[2], e[3], e[4]);
                case 6:
                  return new n(e[0], e[1], e[2], e[3], e[4], e[5]);
                case 7:
                  return new n(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
              }
              var t = ze(n.prototype),
                r = n.apply(t, e);
              return _(r) ? r : t;
            };
          }
          function Er(o, a, s) {
            var u = xr(o);
            return function e() {
              for (var t = arguments.length, r = x(t), n = t, i = Hr(e); n--; )
                r[n] = arguments[n];
              i = t < 3 && r[0] !== i && r[t - 1] !== i ? [] : da(r, i);
              return (t -= i.length) < s
                ? Pr(o, a, Tr, e.placeholder, Bo, r, i, Bo, Bo, s - t)
                : aa(this && this !== oa && this instanceof e ? u : o, this, r);
            };
          }
          function Sr(o) {
            return function (e, t, r) {
              var n,
                i = m(e),
                t =
                  (l(e) ||
                    ((n = f(t, 3)),
                    (e = C(e)),
                    (t = function (e) {
                      return n(i[e], e, i);
                    })),
                  o(e, t, r));
              return -1 < t ? i[n ? e[t] : t] : Bo;
            };
          }
          function Ir(u) {
            return Fr(function (i) {
              var o = i.length,
                e = o,
                t = g.prototype.thru;
              for (u && i.reverse(); e--; ) {
                var r = i[e];
                if ('function' != typeof r) throw new E(Vo);
                t && !s && 'wrapper' == Kr(r) && (s = new g([], !0));
              }
              for (e = s ? e : o; ++e < o; )
                var n = Kr((r = i[e])),
                  a = 'wrapper' == n ? Gr(r) : Bo,
                  s =
                    a && an(a[0]) && 424 == a[1] && !a[4].length && 1 == a[9]
                      ? s[Kr(a[0])].apply(s, a[3])
                      : 1 == r.length && an(r)
                      ? s[n]()
                      : s.thru(r);
              return function () {
                var e = arguments,
                  t = e[0];
                if (s && 1 == e.length && W(t)) return s.plant(t).value();
                for (var r = 0, n = o ? i[r].apply(this, e) : t; ++r < o; )
                  n = i[r].call(this, n);
                return n;
              };
            });
          }
          function Tr(a, s, u, c, l, f, p, h, d, m) {
            var g = s & Fo,
              b = 1 & s,
              v = 2 & s,
              y = 24 & s,
              w = 512 & s,
              _ = v ? Bo : xr(a);
            return function e() {
              for (var t, r, n, i = x((n = arguments.length)), o = n; o--; )
                i[o] = arguments[o];
              return (
                y &&
                  (r = (function (e, t) {
                    for (var r = e.length, n = 0; r--; ) e[r] === t && ++n;
                    return n;
                  })(i, (t = Hr(e)))),
                c && (i = hr(i, c, l, y)),
                f && (i = dr(i, f, p, y)),
                (n -= r),
                y && n < m
                  ? ((r = da(i, t)),
                    Pr(a, s, Tr, e.placeholder, u, i, r, h, d, m - n))
                  : ((t = b ? u : this),
                    (r = v ? t[a] : a),
                    (n = i.length),
                    h
                      ? (i = (function (e, t) {
                          for (
                            var r = e.length, n = I(t.length, r), i = T(e);
                            n--;

                          ) {
                            var o = t[n];
                            e[n] = nn(o, r) ? i[o] : Bo;
                          }
                          return e;
                        })(i, h))
                      : w && 1 < n && i.reverse(),
                    g && d < n && (i.length = d),
                    (r =
                      this && this !== oa && this instanceof e
                        ? _ || xr(r)
                        : r).apply(t, i))
              );
            };
          }
          function Or(r, a) {
            return function (e, t) {
              return (
                (e = e),
                (n = r),
                (i = a(t)),
                (o = {}),
                ft(e, function (e, t, r) {
                  n(o, i(e), t, r);
                }),
                o
              );
              var n, i, o;
            };
          }
          function Nr(n, i) {
            return function (e, t) {
              var r;
              if (e === Bo && t === Bo) return i;
              if ((e !== Bo && (r = e), t !== Bo)) {
                if (r === Bo) return t;
                (t = (
                  'string' == typeof e || 'string' == typeof t
                    ? ((e = c(e)), c)
                    : ((e = Zt(e)), Zt)
                )(t)),
                  (r = n(e, t));
              }
              return r;
            };
          }
          function Cr(n) {
            return Fr(function (e) {
              return (
                (e = ca(e, pa(f()))),
                a(function (t) {
                  var r = this;
                  return n(e, function (e) {
                    return aa(e, r, t);
                  });
                })
              );
            });
          }
          function $r(e, t) {
            var r = (t = t === Bo ? ' ' : c(t)).length;
            return r < 2
              ? r
                ? Dt(t, e)
                : t
              : ((r = Dt(t, he(e / ma(t)))),
                ha(t) ? sr(ga(r), 0, e).join('') : r.slice(0, e));
          }
          function jr(s, e, u, c) {
            var l = 1 & e,
              f = xr(s);
            return function e() {
              for (
                var t = -1,
                  r = arguments.length,
                  n = -1,
                  i = c.length,
                  o = x(i + r),
                  a = this && this !== oa && this instanceof e ? f : s;
                ++n < i;

              )
                o[n] = c[n];
              for (; r--; ) o[n++] = arguments[++t];
              return aa(a, l ? u : this, o);
            };
          }
          function kr(c) {
            return function (e, t, r) {
              r && 'number' != typeof r && p(e, t, r) && (t = r = Bo),
                (e = Pi(e)),
                t === Bo ? ((t = e), (e = 0)) : (t = Pi(t)),
                (r = r === Bo ? (e < t ? 1 : -1) : Pi(r));
              for (
                var n = e,
                  i = r,
                  o = c,
                  a = -1,
                  s = S(he((t - n) / (i || 1)), 0),
                  u = x(s);
                s--;

              )
                (u[o ? s : ++a] = n), (n += i);
              return u;
            };
          }
          function Ar(r) {
            return function (e, t) {
              return (
                ('string' == typeof e && 'string' == typeof t) ||
                  ((e = N(e)), (t = N(t))),
                r(e, t)
              );
            };
          }
          function Pr(e, t, r, n, i, o, a, s, u, c) {
            var l = 8 & t,
              i =
                (4 & (t = (t | (l ? 32 : 64)) & ~(l ? 64 : 32)) || (t &= -4),
                [
                  e,
                  t,
                  i,
                  l ? o : Bo,
                  l ? a : Bo,
                  l ? Bo : o,
                  l ? Bo : a,
                  s,
                  u,
                  c,
                ]),
              o = r.apply(Bo, i);
            return an(e) && dn(o, i), (o.placeholder = n), bn(o, e, t);
          }
          function Rr(e) {
            var n = P[e];
            return function (e, t) {
              var r;
              return (
                (e = N(e)),
                (t = null == t ? 0 : I(O(t), 292)) && ge(e)
                  ? ((r = (h(e) + 'e').split('e')),
                    +(
                      (r = (h(n(r[0] + 'e' + (+r[1] + t))) + 'e').split(
                        'e'
                      ))[0] +
                      'e' +
                      (+r[1] - t)
                    ))
                  : n(e)
              );
            };
          }
          var zr =
            Ie && 1 / iu(new Ie([, -0]))[1] == 1 / 0
              ? function (e) {
                  return new Ie(e);
                }
              : So;
          function Lr(o) {
            return function (e) {
              var t,
                r,
                n,
                i = M(e);
              return i == Zo
                ? ru(e)
                : i == Qo
                ? ((i = e),
                  (t = -1),
                  (r = Array(i.size)),
                  i.forEach(function (e) {
                    r[++t] = [e, e];
                  }),
                  r)
                : ca(o((n = e)), function (e) {
                    return [e, n[e]];
                  });
            };
          }
          function Mr(e, t, r, n, i, o, a, s) {
            var u,
              c,
              l,
              f,
              p,
              h,
              d,
              m,
              g,
              b,
              v,
              y,
              w,
              _ = 2 & t;
            if (_ || 'function' == typeof e)
              return (
                (u = n ? n.length : 0) || ((t &= -97), (n = i = Bo)),
                (a = a === Bo ? a : S(O(a), 0)),
                (s = s === Bo ? s : O(s)),
                (u -= i ? i.length : 0),
                64 & t && ((l = n), (f = i), (n = i = Bo)),
                (c = _ ? Bo : Gr(e)),
                (l = [e, t, r, n, i, l, f, o, a, s]),
                c &&
                  ((f = c),
                  (a = (o = l)[1]),
                  (h = f[1]),
                  (m = (d = a | h) < 131),
                  (g =
                    (h == Fo && 8 == a) ||
                    (h == Fo && 256 == a && o[7].length <= f[8]) ||
                    (384 == h && f[7].length <= f[8] && 8 == a)),
                  m || g) &&
                  (1 & h && ((o[2] = f[2]), (d |= 1 & a ? 0 : 4)),
                  (m = f[3]) &&
                    ((p = o[3]),
                    (o[3] = p ? hr(p, m, f[4]) : m),
                    (o[4] = p ? da(o[3], ya) : f[4])),
                  (m = f[5]) &&
                    ((p = o[5]),
                    (o[5] = p ? dr(p, m, f[6]) : m),
                    (o[6] = p ? da(o[5], ya) : f[6])),
                  (m = f[7]) && (o[7] = m),
                  h & Fo && (o[8] = null == o[8] ? f[8] : I(o[8], f[8])),
                  null == o[9] && (o[9] = f[9]),
                  (o[0] = f[0]),
                  (o[1] = d)),
                (e = l[0]),
                (t = l[1]),
                (r = l[2]),
                (n = l[3]),
                (i = l[4]),
                !(s = l[9] =
                  l[9] === Bo ? (_ ? 0 : e.length) : S(l[9] - u, 0)) &&
                  24 & t &&
                  (t &= -25),
                (g =
                  t && 1 != t
                    ? 8 == t || 16 == t
                      ? Er(e, t, s)
                      : (32 != t && 33 != t) || i.length
                      ? Tr.apply(Bo, l)
                      : jr(e, t, r, n)
                    : ((v = r),
                      (y = 1 & t),
                      (w = xr((b = e))),
                      function e() {
                        return (
                          this && this !== oa && this instanceof e ? w : b
                        ).apply(y ? v : this, arguments);
                      })),
                bn((c ? Ft : dn)(g, l), e, t)
              );
            throw new E(Vo);
          }
          function Dr(e, t, r, n) {
            return e === Bo || (D(e, q[r]) && !z.call(n, r)) ? t : e;
          }
          function Wr(e, t, r, n, i, o) {
            return (
              _(e) && _(t) && (o.set(t, e), kt(e, t, Bo, Wr, o), o.delete(t)), e
            );
          }
          function Br(e) {
            return Ti(e) ? Bo : e;
          }
          function Vr(e, t, r, n, i, o) {
            var a = 1 & r,
              s = e.length,
              u = t.length;
            if (s != u && !(a && s < u)) return !1;
            var u = o.get(e),
              c = o.get(t);
            if (u && c) return u == t && c == e;
            var l = -1,
              f = !0,
              p = 2 & r ? new Ve() : Bo;
            for (o.set(e, t), o.set(t, e); ++l < s; ) {
              var h,
                d = e[l],
                m = t[l];
              if (
                (h = n
                  ? a
                    ? n(m, d, l, t, e, o)
                    : n(d, m, l, e, t, o)
                  : h) !== Bo
              ) {
                if (h) continue;
                f = !1;
                break;
              }
              if (p) {
                if (
                  !Ms(t, function (e, t) {
                    return (
                      !Ys(p, t) && (d === e || i(d, e, r, n, o)) && p.push(t)
                    );
                  })
                ) {
                  f = !1;
                  break;
                }
              } else if (d !== m && !i(d, m, r, n, o)) {
                f = !1;
                break;
              }
            }
            return o.delete(e), o.delete(t), f;
          }
          function Fr(e) {
            return gn(fn(e, Bo, On), e + '');
          }
          function Ur(e) {
            return mt(e, C, Xr);
          }
          function qr(e) {
            return mt(e, $, Qr);
          }
          var Gr = Oe
            ? function (e) {
                return Oe.get(e);
              }
            : So;
          function Kr(e) {
            for (
              var t = e.name + '', r = Ne[t], n = z.call(Ne, t) ? r.length : 0;
              n--;

            ) {
              var i = r[n],
                o = i.func;
              if (null == o || o == e) return i.name;
            }
            return t;
          }
          function Hr(e) {
            return (z.call(d, 'placeholder') ? d : e).placeholder;
          }
          function f() {
            var e = (e = d.iteratee || wo) === wo ? It : e;
            return arguments.length ? e(arguments[0], arguments[1]) : e;
          }
          function Zr(e, t) {
            var r,
              n,
              e = e.__data__;
            return (
              'string' == (n = typeof (r = t)) ||
              'number' == n ||
              'symbol' == n ||
              'boolean' == n
                ? '__proto__' !== r
                : null === r
            )
              ? e['string' == typeof t ? 'string' : 'hash']
              : e.map;
          }
          function Yr(e) {
            for (var t = C(e), r = t.length; r--; ) {
              var n = t[r],
                i = e[n];
              t[r] = [n, i, cn(i)];
            }
            return t;
          }
          function Jr(e, t) {
            t = t;
            e = null == (e = e) ? Bo : e[t];
            return St(e) ? e : Bo;
          }
          var Xr = me
              ? function (t) {
                  return null == t
                    ? []
                    : ((t = m(t)),
                      ua(me(t), function (e) {
                        return ie.call(t, e);
                      }));
                }
              : jo,
            Qr = me
              ? function (e) {
                  for (var t = []; e; ) la(t, Xr(e)), (e = re(e));
                  return t;
                }
              : jo,
            M = r;
          function en(e, t, r) {
            for (var n = -1, i = (t = or(t, e)).length, o = !1; ++n < i; ) {
              var a = xn(t[n]);
              if (!(o = null != e && r(e, a))) break;
              e = e[a];
            }
            return o || ++n != i
              ? o
              : !!(i = null == e ? 0 : e.length) &&
                  Ei(i) &&
                  nn(a, i) &&
                  (W(e) || bi(e));
          }
          function tn(e) {
            return 'function' != typeof e.constructor || un(e) ? {} : ze(re(e));
          }
          function rn(e) {
            return W(e) || bi(e) || !!(ae && e && e[ae]);
          }
          function nn(e, t) {
            var r = typeof e;
            return (
              !!(t = null == t ? Uo : t) &&
              ('number' == r || ('symbol' != r && ps.test(e))) &&
              -1 < e &&
              e % 1 == 0 &&
              e < t
            );
          }
          function p(e, t, r) {
            var n;
            if (_(r))
              return (
                ('number' == (n = typeof t)
                  ? l(r) && nn(t, r.length)
                  : 'string' == n && t in r) && D(r[t], e)
              );
          }
          function on(e, t) {
            var r;
            if (!W(e))
              return (
                'number' == (r = typeof e) ||
                'symbol' == r ||
                'boolean' == r ||
                null == e ||
                y(e) ||
                Za.test(e) ||
                !Ha.test(e) ||
                (null != t && e in m(t))
              );
          }
          function an(e) {
            var t = Kr(e),
              r = d[t];
            return (
              'function' == typeof r &&
              t in b.prototype &&
              (e === r || ((t = Gr(r)) && e === t[0]))
            );
          }
          ((o && M(new o(new ArrayBuffer(1))) != ra) ||
            (Ee && M(new Ee()) != Zo) ||
            (Se && M(Se.resolve()) != Ta) ||
            (Ie && M(new Ie()) != Qo) ||
            (e && M(new e()) != ta)) &&
            (M = function (e) {
              var t = r(e),
                e = t == Jo ? e.constructor : Bo,
                e = e ? En(e) : '';
              if (e)
                switch (e) {
                  case Ce:
                    return ra;
                  case $e:
                    return Zo;
                  case je:
                    return Ta;
                  case ke:
                    return Qo;
                  case Ae:
                    return ta;
                }
              return t;
            });
          var sn = G ? _i : ko;
          function un(e) {
            var t = e && e.constructor;
            return e === (('function' == typeof t && t.prototype) || q);
          }
          function cn(e) {
            return e == e && !_(e);
          }
          function ln(t, r) {
            return function (e) {
              return null != e && e[t] === r && (r !== Bo || t in m(e));
            };
          }
          function fn(o, a, s) {
            return (
              (a = S(a === Bo ? o.length - 1 : a, 0)),
              function () {
                for (
                  var e = arguments, t = -1, r = S(e.length - a, 0), n = x(r);
                  ++t < r;

                )
                  n[t] = e[a + t];
                for (var t = -1, i = x(a + 1); ++t < a; ) i[t] = e[t];
                return (i[a] = s(n)), aa(o, this, i);
              }
            );
          }
          function pn(e, t) {
            return t.length < 2 ? e : dt(e, s(t, 0, -1));
          }
          function hn(e, t) {
            if (
              ('constructor' !== t || 'function' != typeof e[t]) &&
              '__proto__' != t
            )
              return e[t];
          }
          var dn = vn(Ft),
            mn =
              pe ||
              function (e, t) {
                return oa.setTimeout(e, t);
              },
            gn = vn(t);
          function bn(e, t, r) {
            var n,
              i,
              o,
              t = t + '';
            return gn(
              e,
              ((i = (t = (t = e = t).match(ts)) ? t[1].split(rs) : []),
              (o = r),
              sa(_a, function (e) {
                var t = '_.' + e[0];
                o & e[1] && !Ps(i, t) && i.push(t);
              }),
              (t = i.sort()),
              (r = t.length)
                ? ((t[(n = r - 1)] = (1 < r ? '& ' : '') + t[n]),
                  (t = t.join(2 < r ? ', ' : ' ')),
                  e.replace(es, '{\n/* [wrapped with ' + t + '] */\n'))
                : e)
            );
          }
          function vn(r) {
            var n = 0,
              i = 0;
            return function () {
              var e = ye(),
                t = 16 - (e - i);
              if (((i = e), 0 < t)) {
                if (800 <= ++n) return arguments[0];
              } else n = 0;
              return r.apply(Bo, arguments);
            };
          }
          function yn(e, t) {
            var r = -1,
              n = e.length,
              i = n - 1;
            for (t = t === Bo ? n : t; ++r < t; ) {
              var o = Mt(r, i),
                a = e[o];
              (e[o] = e[r]), (e[r] = a);
            }
            return (e.length = t), e;
          }
          wn = (le = li(
            (le = function (e) {
              var i = [];
              return (
                46 === e.charCodeAt(0) && i.push(''),
                e.replace(Ya, function (e, t, r, n) {
                  i.push(r ? n.replace(os, '$1') : t || e);
                }),
                i
              );
            }),
            function (e) {
              return 500 === wn.size && wn.clear(), e;
            }
          )).cache;
          var wn,
            _n = le;
          function xn(e) {
            var t;
            return 'string' == typeof e || y(e)
              ? e
              : '0' == (t = e + '') && 1 / e == -1 / 0
              ? '-0'
              : t;
          }
          function En(e) {
            if (null != e) {
              try {
                return K.call(e);
              } catch (e) {}
              try {
                return e + '';
              } catch (e) {}
            }
            return '';
          }
          function Sn(e) {
            var t;
            return e instanceof b
              ? e.clone()
              : (((t = new g(e.__wrapped__, e.__chain__)).__actions__ = T(
                  e.__actions__
                )),
                (t.__index__ = e.__index__),
                (t.__values__ = e.__values__),
                t);
          }
          (o = a(function (e, t) {
            return w(e) ? nt(e, u(t, 1, w, !0)) : [];
          })),
            (Se = a(function (e, t) {
              var r = n(t);
              return (
                w(r) && (r = Bo), w(e) ? nt(e, u(t, 1, w, !0), f(r, 2)) : []
              );
            })),
            (e = a(function (e, t) {
              var r = n(t);
              return w(r) && (r = Bo), w(e) ? nt(e, u(t, 1, w, !0), Bo, r) : [];
            }));
          function In(e, t, r) {
            var n = null == e ? 0 : e.length;
            return n
              ? ((r = null == r ? 0 : O(r)) < 0 && (r = S(n + r, 0)),
                Ws(e, f(t, 3), r))
              : -1;
          }
          function Tn(e, t, r) {
            var n,
              i = null == e ? 0 : e.length;
            return i
              ? ((n = i - 1),
                r !== Bo &&
                  ((n = O(r)), (n = r < 0 ? S(i + n, 0) : I(n, i - 1))),
                Ws(e, f(t, 3), n, !0))
              : -1;
          }
          function On(e) {
            return (null == e ? 0 : e.length) ? u(e, 1) : [];
          }
          function Nn(e) {
            return e && e.length ? e[0] : Bo;
          }
          (G = a(function (e) {
            var t = ca(e, nr);
            return t.length && t[0] === e[0] ? yt(t) : [];
          })),
            (pe = a(function (e) {
              var t = n(e),
                r = ca(e, nr);
              return (
                t === n(r) ? (t = Bo) : r.pop(),
                r.length && r[0] === e[0] ? yt(r, f(t, 2)) : []
              );
            })),
            (t = a(function (e) {
              var t = n(e),
                r = ca(e, nr);
              return (
                (t = 'function' == typeof t ? t : Bo) && r.pop(),
                r.length && r[0] === e[0] ? yt(r, Bo, t) : []
              );
            }));
          function n(e) {
            var t = null == e ? 0 : e.length;
            return t ? e[t - 1] : Bo;
          }
          le = a(Cn);
          function Cn(e, t) {
            return e && e.length && t && t.length ? zt(e, t) : e;
          }
          var $n = Fr(function (e, t) {
            var r = null == e ? 0 : e.length,
              n = Qe(e, t);
            return (
              Lt(
                e,
                ca(t, function (e) {
                  return nn(e, r) ? +e : e;
                }).sort(pr)
              ),
              n
            );
          });
          function jn(e) {
            return null == e ? e : xe.call(e);
          }
          var kn = a(function (e) {
              return Yt(u(e, 1, w, !0));
            }),
            An = a(function (e) {
              var t = n(e);
              return w(t) && (t = Bo), Yt(u(e, 1, w, !0), f(t, 2));
            }),
            Pn = a(function (e) {
              var t = 'function' == typeof (t = n(e)) ? t : Bo;
              return Yt(u(e, 1, w, !0), Bo, t);
            });
          function Rn(t) {
            var r;
            return t && t.length
              ? ((r = 0),
                (t = ua(t, function (e) {
                  return w(e) && ((r = S(e.length, r)), 1);
                })),
                Ks(r, function (e) {
                  return ca(t, Us(e));
                }))
              : [];
          }
          function zn(e, t) {
            return e && e.length
              ? ((e = Rn(e)),
                null == t
                  ? e
                  : ca(e, function (e) {
                      return aa(t, Bo, e);
                    }))
              : [];
          }
          var Ln = a(function (e, t) {
              return w(e) ? nt(e, t) : [];
            }),
            Mn = a(function (e) {
              return tr(ua(e, w));
            }),
            Dn = a(function (e) {
              var t = n(e);
              return w(t) && (t = Bo), tr(ua(e, w), f(t, 2));
            }),
            Wn = a(function (e) {
              var t = 'function' == typeof (t = n(e)) ? t : Bo;
              return tr(ua(e, w), Bo, t);
            }),
            Bn = a(Rn);
          var Vn = a(function (e) {
            var t = e.length,
              t =
                'function' == typeof (t = 1 < t ? e[t - 1] : Bo)
                  ? (e.pop(), t)
                  : Bo;
            return zn(e, t);
          });
          function Fn(e) {
            e = d(e);
            return (e.__chain__ = !0), e;
          }
          function Un(e, t) {
            return t(e);
          }
          var qn = Fr(function (t) {
            function e(e) {
              return Qe(e, t);
            }
            var r = t.length,
              n = r ? t[0] : 0,
              i = this.__wrapped__;
            return !(1 < r || this.__actions__.length) &&
              i instanceof b &&
              nn(n)
              ? ((i = i.slice(n, +n + (r ? 1 : 0))).__actions__.push({
                  func: Un,
                  args: [e],
                  thisArg: Bo,
                }),
                new g(i, this.__chain__).thru(function (e) {
                  return r && !e.length && e.push(Bo), e;
                }))
              : this.thru(e);
          });
          var Gn = gr(function (e, t, r) {
            z.call(e, r) ? ++e[r] : Xe(e, r, 1);
          });
          var Kn = Sr(In),
            Hn = Sr(Tn);
          function Zn(e, t) {
            return (W(e) ? sa : it)(e, f(t, 3));
          }
          function Yn(e, t) {
            return (W(e) ? ks : ot)(e, f(t, 3));
          }
          var Jn = gr(function (e, t, r) {
            z.call(e, r) ? e[r].push(t) : Xe(e, r, [t]);
          });
          var Xn = a(function (e, t, r) {
              var n = -1,
                i = 'function' == typeof t,
                o = l(e) ? x(e.length) : [];
              return (
                it(e, function (e) {
                  o[++n] = i ? aa(t, e, r) : wt(e, t, r);
                }),
                o
              );
            }),
            Qn = gr(function (e, t, r) {
              Xe(e, r, t);
            });
          function ei(e, t) {
            return (W(e) ? ca : Ct)(e, f(t, 3));
          }
          var ti = gr(
            function (e, t, r) {
              e[r ? 0 : 1].push(t);
            },
            function () {
              return [[], []];
            }
          );
          var ri = a(function (e, t) {
              var r;
              return null == e
                ? []
                : (1 < (r = t.length) && p(e, t[0], t[1])
                    ? (t = [])
                    : 2 < r && p(t[0], t[1], t[2]) && (t = [t[0]]),
                  Pt(e, u(t, 1), []));
            }),
            ni =
              fe ||
              function () {
                return oa.Date.now();
              };
          function ii(e, t, r) {
            return (
              (t = r ? Bo : t),
              (t = e && null == t ? e.length : t),
              Mr(e, Fo, Bo, Bo, Bo, Bo, t)
            );
          }
          function oi(e, t) {
            var r;
            if ('function' != typeof t) throw new E(Vo);
            return (
              (e = O(e)),
              function () {
                return (
                  0 < --e && (r = t.apply(this, arguments)),
                  e <= 1 && (t = Bo),
                  r
                );
              }
            );
          }
          var ai = a(function (e, t, r) {
              var n,
                i = 1;
              return (
                r.length && ((n = da(r, Hr(ai))), (i |= 32)), Mr(e, i, t, r, n)
              );
            }),
            si = a(function (e, t, r) {
              var n,
                i = 3;
              return (
                r.length && ((n = da(r, Hr(si))), (i |= 32)), Mr(t, i, e, r, n)
              );
            });
          function ui(n, r, e) {
            var i,
              o,
              a,
              s,
              u,
              c,
              l = 0,
              f = !1,
              p = !1,
              t = !0;
            if ('function' != typeof n) throw new E(Vo);
            function h(e) {
              var t = i,
                r = o;
              return (i = o = Bo), (l = e), (s = n.apply(r, t));
            }
            function d(e) {
              var t = e - c;
              return c === Bo || r <= t || t < 0 || (p && a <= e - l);
            }
            function m() {
              var e,
                t = ni();
              if (d(t)) return g(t);
              u = mn(m, ((e = r - ((t = t) - c)), p ? I(e, a - (t - l)) : e));
            }
            function g(e) {
              return (u = Bo), t && i ? h(e) : ((i = o = Bo), s);
            }
            function b() {
              var e = ni(),
                t = d(e);
              if (((i = arguments), (o = this), (c = e), t)) {
                if (u === Bo) return (l = e = c), (u = mn(m, r)), f ? h(e) : s;
                if (p) return ur(u), (u = mn(m, r)), h(c);
              }
              return u === Bo && (u = mn(m, r)), s;
            }
            return (
              (r = N(r) || 0),
              _(e) &&
                ((f = !!e.leading),
                (p = 'maxWait' in e),
                (a = p ? S(N(e.maxWait) || 0, r) : a),
                (t = 'trailing' in e ? !!e.trailing : t)),
              (b.cancel = function () {
                u !== Bo && ur(u), (l = 0), (i = c = o = u = Bo);
              }),
              (b.flush = function () {
                return u === Bo ? s : g(ni());
              }),
              b
            );
          }
          var fe = a(function (e, t) {
              return rt(e, 1, t);
            }),
            ci = a(function (e, t, r) {
              return rt(e, N(t) || 0, r);
            });
          function li(n, i) {
            if ('function' != typeof n || (null != i && 'function' != typeof i))
              throw new E(Vo);
            function o() {
              var e = arguments,
                t = i ? i.apply(this, e) : e[0],
                r = o.cache;
              return r.has(t)
                ? r.get(t)
                : ((e = n.apply(this, e)), (o.cache = r.set(t, e) || r), e);
            }
            return (o.cache = new (li.Cache || Be)()), o;
          }
          function fi(t) {
            if ('function' != typeof t) throw new E(Vo);
            return function () {
              var e = arguments;
              switch (e.length) {
                case 0:
                  return !t.call(this);
                case 1:
                  return !t.call(this, e[0]);
                case 2:
                  return !t.call(this, e[0], e[1]);
                case 3:
                  return !t.call(this, e[0], e[1], e[2]);
              }
              return !t.apply(this, e);
            };
          }
          li.Cache = Be;
          var ar = ar(function (n, i) {
              var o = (i =
                1 == i.length && W(i[0])
                  ? ca(i[0], pa(f()))
                  : ca(u(i, 1), pa(f()))).length;
              return a(function (e) {
                for (var t = -1, r = I(e.length, o); ++t < r; )
                  e[t] = i[t].call(this, e[t]);
                return aa(n, this, e);
              });
            }),
            pi = a(function (e, t) {
              var r = da(t, Hr(pi));
              return Mr(e, 32, Bo, t, r);
            }),
            hi = a(function (e, t) {
              var r = da(t, Hr(hi));
              return Mr(e, 64, Bo, t, r);
            }),
            di = Fr(function (e, t) {
              return Mr(e, 256, Bo, Bo, Bo, t);
            });
          function D(e, t) {
            return e === t || (e != e && t != t);
          }
          var mi = Ar(gt),
            gi = Ar(function (e, t) {
              return t <= e;
            }),
            bi = _t(
              (function () {
                return arguments;
              })()
            )
              ? _t
              : function (e) {
                  return B(e) && z.call(e, 'callee') && !ie.call(e, 'callee');
                },
            W = x.isArray,
            vi = Is
              ? pa(Is)
              : function (e) {
                  return B(e) && r(e) == Na;
                };
          function l(e) {
            return null != e && Ei(e.length) && !_i(e);
          }
          function w(e) {
            return B(e) && l(e);
          }
          var yi = U || ko,
            U = Ts
              ? pa(Ts)
              : function (e) {
                  return B(e) && r(e) == Ho;
                };
          function wi(e) {
            var t;
            return (
              !!B(e) &&
              ((t = r(e)) == Ea ||
                '[object DOMException]' == t ||
                ('string' == typeof e.message &&
                  'string' == typeof e.name &&
                  !Ti(e)))
            );
          }
          function _i(e) {
            return (
              !!_(e) &&
              ((e = r(e)) == Sa ||
                e == Ia ||
                '[object AsyncFunction]' == e ||
                '[object Proxy]' == e)
            );
          }
          function xi(e) {
            return 'number' == typeof e && e == O(e);
          }
          function Ei(e) {
            return 'number' == typeof e && -1 < e && e % 1 == 0 && e <= Uo;
          }
          function _(e) {
            var t = typeof e;
            return null != e && ('object' == t || 'function' == t);
          }
          function B(e) {
            return null != e && 'object' == typeof e;
          }
          var Si = Os
            ? pa(Os)
            : function (e) {
                return B(e) && M(e) == Zo;
              };
          function Ii(e) {
            return 'number' == typeof e || (B(e) && r(e) == Yo);
          }
          function Ti(e) {
            return (
              !(!B(e) || r(e) != Jo) &&
              (null === (e = re(e)) ||
                ('function' ==
                  typeof (e = z.call(e, 'constructor') && e.constructor) &&
                  e instanceof e &&
                  K.call(e) == J))
            );
          }
          var Oi = Ns
            ? pa(Ns)
            : function (e) {
                return B(e) && r(e) == Xo;
              };
          var Ni = Cs
            ? pa(Cs)
            : function (e) {
                return B(e) && M(e) == Qo;
              };
          function Ci(e) {
            return 'string' == typeof e || (!W(e) && B(e) && r(e) == ea);
          }
          function y(e) {
            return 'symbol' == typeof e || (B(e) && r(e) == Oa);
          }
          var $i = $s
            ? pa($s)
            : function (e) {
                return B(e) && Ei(e.length) && !!na[r(e)];
              };
          var ji = Ar(Nt),
            ki = Ar(function (e, t) {
              return e <= t;
            });
          function Ai(e) {
            if (!e) return [];
            if (l(e)) return (Ci(e) ? ga : T)(e);
            if (se && e[se]) {
              for (var t, r = e[se](), n = []; !(t = r.next()).done; )
                n.push(t.value);
              return n;
            }
            var i = M(e);
            return (i == Zo ? ru : i == Qo ? iu : ro)(e);
          }
          function Pi(e) {
            return e
              ? (e = N(e)) === 1 / 0 || e === -1 / 0
                ? 17976931348623157e292 * (e < 0 ? -1 : 1)
                : e == e
                ? e
                : 0
              : 0 === e
              ? e
              : 0;
          }
          function O(e) {
            var e = Pi(e),
              t = e % 1;
            return e == e ? (t ? e - t : e) : 0;
          }
          function Ri(e) {
            return e ? et(O(e), 0, qo) : 0;
          }
          function N(e) {
            if ('number' == typeof e) return e;
            if (y(e)) return wa;
            if (
              'string' !=
              typeof (e = _(e)
                ? _((t = 'function' == typeof e.valueOf ? e.valueOf() : e))
                  ? t + ''
                  : t
                : e)
            )
              return 0 === e ? e : +e;
            e = Hs(e);
            var t = cs.test(e);
            return t || fs.test(e)
              ? Es(e.slice(2), t ? 2 : 8)
              : us.test(e)
              ? wa
              : +e;
          }
          function zi(e) {
            return mr(e, $(e));
          }
          function h(e) {
            return null == e ? '' : c(e);
          }
          var Li = br(function (e, t) {
              if (un(t) || l(t)) mr(t, C(t), e);
              else for (var r in t) z.call(t, r) && He(e, r, t[r]);
            }),
            Mi = br(function (e, t) {
              mr(t, $(t), e);
            }),
            Di = br(function (e, t, r, n) {
              mr(t, $(t), e, n);
            }),
            Wi = br(function (e, t, r, n) {
              mr(t, C(t), e, n);
            }),
            Bi = Fr(Qe);
          var Vi = a(function (e, t) {
              e = m(e);
              var r = -1,
                n = t.length,
                i = 2 < n ? t[2] : Bo;
              for (i && p(t[0], t[1], i) && (n = 1); ++r < n; )
                for (var o = t[r], a = $(o), s = -1, u = a.length; ++s < u; ) {
                  var c = a[s],
                    l = e[c];
                  (l === Bo || (D(l, q[c]) && !z.call(e, c))) && (e[c] = o[c]);
                }
              return e;
            }),
            Fi = a(function (e) {
              return e.push(Bo, Wr), aa(Yi, Bo, e);
            });
          function Ui(e, t, r) {
            e = null == e ? Bo : dt(e, t);
            return e === Bo ? r : e;
          }
          function qi(e, t) {
            return null != e && en(e, t, vt);
          }
          var Gi = Or(function (e, t, r) {
              e[
                (t =
                  null != t && 'function' != typeof t.toString ? Y.call(t) : t)
              ] = r;
            }, bo(j)),
            Ki = Or(function (e, t, r) {
              null != t && 'function' != typeof t.toString && (t = Y.call(t)),
                z.call(e, t) ? e[t].push(r) : (e[t] = [r]);
            }, f),
            Hi = a(wt);
          function C(e) {
            return (l(e) ? Fe : Tt)(e);
          }
          function $(e) {
            return l(e) ? Fe(e, !0) : Ot(e);
          }
          var Zi = br(function (e, t, r) {
              kt(e, t, r);
            }),
            Yi = br(function (e, t, r, n) {
              kt(e, t, r, n);
            }),
            Ji = Fr(function (t, e) {
              var r = {};
              if (null != t)
                for (
                  var n = !1,
                    i =
                      ((e = ca(e, function (e) {
                        return (e = or(e, t)), (n = n || 1 < e.length), e;
                      })),
                      mr(t, qr(t), r),
                      n && (r = v(r, 7, Br)),
                      e.length);
                  i--;

                )
                  Jt(r, e[i]);
              return r;
            });
          var Xi = Fr(function (e, t) {
            return null == e
              ? {}
              : Rt((r = e), t, function (e, t) {
                  return qi(r, t);
                });
            var r;
          });
          function Qi(e, r) {
            var t;
            return null == e
              ? {}
              : ((t = ca(qr(e), function (e) {
                  return [e];
                })),
                (r = f(r)),
                Rt(e, t, function (e, t) {
                  return r(e, t[0]);
                }));
          }
          var eo = Lr(C),
            to = Lr($);
          function ro(e) {
            return null == e ? [] : Zs(e, C(e));
          }
          var no = _r(function (e, t, r) {
            return (t = t.toLowerCase()), e + (r ? io(t) : t);
          });
          function io(e) {
            return po(h(e).toLowerCase());
          }
          function oo(e) {
            return (e = h(e)) && e.replace(hs, Qs).replace(bs, '');
          }
          var ao = _r(function (e, t, r) {
              return e + (r ? '-' : '') + t.toLowerCase();
            }),
            so = _r(function (e, t, r) {
              return e + (r ? ' ' : '') + t.toLowerCase();
            }),
            uo = wr('toLowerCase');
          var co = _r(function (e, t, r) {
            return e + (r ? '_' : '') + t.toLowerCase();
          });
          var lo = _r(function (e, t, r) {
            return e + (r ? ' ' : '') + po(t);
          });
          var fo = _r(function (e, t, r) {
              return e + (r ? ' ' : '') + t.toUpperCase();
            }),
            po = wr('toUpperCase');
          function ho(e, t, r) {
            return (
              (e = h(e)),
              (t = r ? Bo : t) === Bo
                ? ((r = e), ys.test(r) ? e.match(vs) || [] : e.match(ns) || [])
                : e.match(t) || []
            );
          }
          var mo = a(function (e, t) {
              try {
                return aa(e, Bo, t);
              } catch (e) {
                return wi(e) ? e : new k(e);
              }
            }),
            go = Fr(function (t, e) {
              return (
                sa(e, function (e) {
                  (e = xn(e)), Xe(t, e, ai(t[e], t));
                }),
                t
              );
            });
          function bo(e) {
            return function () {
              return e;
            };
          }
          var vo = Ir(),
            yo = Ir(!0);
          function j(e) {
            return e;
          }
          function wo(e) {
            return It('function' == typeof e ? e : v(e, 1));
          }
          var _o = a(function (t, r) {
              return function (e) {
                return wt(e, t, r);
              };
            }),
            xo = a(function (t, r) {
              return function (e) {
                return wt(t, e, r);
              };
            });
          function Eo(n, t, e) {
            var r = C(t),
              i = ht(t, r),
              o =
                (null != e ||
                  (_(t) && (i.length || !r.length)) ||
                  ((e = t), (t = n), (n = this), (i = ht(t, C(t)))),
                !(_(e) && 'chain' in e && !e.chain)),
              a = _i(n);
            return (
              sa(i, function (e) {
                var r = t[e];
                (n[e] = r),
                  a &&
                    (n.prototype[e] = function () {
                      var e,
                        t = this.__chain__;
                      return o || t
                        ? (((e = n(this.__wrapped__)).__actions__ = T(
                            this.__actions__
                          )).push({ func: r, args: arguments, thisArg: n }),
                          (e.__chain__ = t),
                          e)
                        : r.apply(n, la([this.value()], arguments));
                    });
              }),
              n
            );
          }
          function So() {}
          var Io = Cr(ca),
            To = Cr(As),
            Oo = Cr(Ms);
          function No(e) {
            return on(e)
              ? Us(xn(e))
              : ((t = e),
                function (e) {
                  return dt(e, t);
                });
            var t;
          }
          var Co = kr(),
            $o = kr(!0);
          function jo() {
            return [];
          }
          function ko() {
            return !1;
          }
          var Ao = Nr(function (e, t) {
              return e + t;
            }, 0),
            Po = Rr('ceil'),
            Ro = Nr(function (e, t) {
              return e / t;
            }, 1),
            zo = Rr('floor');
          var Lo,
            Mo = Nr(function (e, t) {
              return e * t;
            }, 1),
            Do = Rr('round'),
            Wo = Nr(function (e, t) {
              return e - t;
            }, 0);
          return (
            (d.after = function (e, t) {
              if ('function' != typeof t) throw new E(Vo);
              return (
                (e = O(e)),
                function () {
                  if (--e < 1) return t.apply(this, arguments);
                }
              );
            }),
            (d.ary = ii),
            (d.assign = Li),
            (d.assignIn = Mi),
            (d.assignInWith = Di),
            (d.assignWith = Wi),
            (d.at = Bi),
            (d.before = oi),
            (d.bind = ai),
            (d.bindAll = go),
            (d.bindKey = si),
            (d.castArray = function () {
              var e;
              return arguments.length ? (W((e = arguments[0])) ? e : [e]) : [];
            }),
            (d.chain = Fn),
            (d.chunk = function (e, t, r) {
              t = (r ? p(e, t, r) : t === Bo) ? 1 : S(O(t), 0);
              var n = null == e ? 0 : e.length;
              if (!n || t < 1) return [];
              for (var i = 0, o = 0, a = x(he(n / t)); i < n; )
                a[o++] = s(e, i, (i += t));
              return a;
            }),
            (d.compact = function (e) {
              for (
                var t = -1, r = null == e ? 0 : e.length, n = 0, i = [];
                ++t < r;

              ) {
                var o = e[t];
                o && (i[n++] = o);
              }
              return i;
            }),
            (d.concat = function () {
              var e = arguments.length;
              if (!e) return [];
              for (var t = x(e - 1), r = arguments[0], n = e; n--; )
                t[n - 1] = arguments[n];
              return la(W(r) ? T(r) : [r], u(t, 1));
            }),
            (d.cond = function (n) {
              var i = null == n ? 0 : n.length,
                t = f();
              return (
                (n = i
                  ? ca(n, function (e) {
                      if ('function' != typeof e[1]) throw new E(Vo);
                      return [t(e[0]), e[1]];
                    })
                  : []),
                a(function (e) {
                  for (var t = -1; ++t < i; ) {
                    var r = n[t];
                    if (aa(r[0], this, e)) return aa(r[1], this, e);
                  }
                })
              );
            }),
            (d.conforms = function (e) {
              return (
                (t = v(e, 1)),
                (r = C(t)),
                function (e) {
                  return tt(e, t, r);
                }
              );
              var t, r;
            }),
            (d.constant = bo),
            (d.countBy = Gn),
            (d.create = function (e, t) {
              return (e = ze(e)), null == t ? e : Je(e, t);
            }),
            (d.curry = function e(t, r, n) {
              t = Mr(t, 8, Bo, Bo, Bo, Bo, Bo, (r = n ? Bo : r));
              return (t.placeholder = e.placeholder), t;
            }),
            (d.curryRight = function e(t, r, n) {
              t = Mr(t, 16, Bo, Bo, Bo, Bo, Bo, (r = n ? Bo : r));
              return (t.placeholder = e.placeholder), t;
            }),
            (d.debounce = ui),
            (d.defaults = Vi),
            (d.defaultsDeep = Fi),
            (d.defer = fe),
            (d.delay = ci),
            (d.difference = o),
            (d.differenceBy = Se),
            (d.differenceWith = e),
            (d.drop = function (e, t, r) {
              var n = null == e ? 0 : e.length;
              return n
                ? s(e, (t = r || t === Bo ? 1 : O(t)) < 0 ? 0 : t, n)
                : [];
            }),
            (d.dropRight = function (e, t, r) {
              var n = null == e ? 0 : e.length;
              return n
                ? s(e, 0, (t = n - (t = r || t === Bo ? 1 : O(t))) < 0 ? 0 : t)
                : [];
            }),
            (d.dropRightWhile = function (e, t) {
              return e && e.length ? Qt(e, f(t, 3), !0, !0) : [];
            }),
            (d.dropWhile = function (e, t) {
              return e && e.length ? Qt(e, f(t, 3), !0) : [];
            }),
            (d.fill = function (e, t, r, n) {
              if (!(u = null == e ? 0 : e.length)) return [];
              r && 'number' != typeof r && p(e, t, r) && ((r = 0), (n = u));
              var i = e,
                o = t,
                a = r,
                s = n,
                u = i.length;
              for (
                (a = O(a)) < 0 && (a = u < -a ? 0 : u + a),
                  (s = s === Bo || u < s ? u : O(s)) < 0 && (s += u),
                  s = s < a ? 0 : Ri(s);
                a < s;

              )
                i[a++] = o;
              return i;
            }),
            (d.filter = function (e, t) {
              return (W(e) ? ua : ut)(e, f(t, 3));
            }),
            (d.flatMap = function (e, t) {
              return u(ei(e, t), 1);
            }),
            (d.flatMapDeep = function (e, t) {
              return u(ei(e, t), 1 / 0);
            }),
            (d.flatMapDepth = function (e, t, r) {
              return (r = r === Bo ? 1 : O(r)), u(ei(e, t), r);
            }),
            (d.flatten = On),
            (d.flattenDeep = function (e) {
              return (null == e ? 0 : e.length) ? u(e, 1 / 0) : [];
            }),
            (d.flattenDepth = function (e, t) {
              return (null == e ? 0 : e.length)
                ? u(e, (t = t === Bo ? 1 : O(t)))
                : [];
            }),
            (d.flip = function (e) {
              return Mr(e, 512);
            }),
            (d.flow = vo),
            (d.flowRight = yo),
            (d.fromPairs = function (e) {
              for (
                var t = -1, r = null == e ? 0 : e.length, n = {};
                ++t < r;

              ) {
                var i = e[t];
                n[i[0]] = i[1];
              }
              return n;
            }),
            (d.functions = function (e) {
              return null == e ? [] : ht(e, C(e));
            }),
            (d.functionsIn = function (e) {
              return null == e ? [] : ht(e, $(e));
            }),
            (d.groupBy = Jn),
            (d.initial = function (e) {
              return (null == e ? 0 : e.length) ? s(e, 0, -1) : [];
            }),
            (d.intersection = G),
            (d.intersectionBy = pe),
            (d.intersectionWith = t),
            (d.invert = Gi),
            (d.invertBy = Ki),
            (d.invokeMap = Xn),
            (d.iteratee = wo),
            (d.keyBy = Qn),
            (d.keys = C),
            (d.keysIn = $),
            (d.map = ei),
            (d.mapKeys = function (e, n) {
              var i = {};
              return (
                (n = f(n, 3)),
                ft(e, function (e, t, r) {
                  Xe(i, n(e, t, r), e);
                }),
                i
              );
            }),
            (d.mapValues = function (e, n) {
              var i = {};
              return (
                (n = f(n, 3)),
                ft(e, function (e, t, r) {
                  Xe(i, t, n(e, t, r));
                }),
                i
              );
            }),
            (d.matches = function (e) {
              return $t(v(e, 1));
            }),
            (d.matchesProperty = function (e, t) {
              return jt(e, v(t, 1));
            }),
            (d.memoize = li),
            (d.merge = Zi),
            (d.mergeWith = Yi),
            (d.method = _o),
            (d.methodOf = xo),
            (d.mixin = Eo),
            (d.negate = fi),
            (d.nthArg = function (t) {
              return (
                (t = O(t)),
                a(function (e) {
                  return At(e, t);
                })
              );
            }),
            (d.omit = Ji),
            (d.omitBy = function (e, t) {
              return Qi(e, fi(f(t)));
            }),
            (d.once = function (e) {
              return oi(2, e);
            }),
            (d.orderBy = function (e, t, r, n) {
              return null == e
                ? []
                : Pt(
                    e,
                    (t = W(t) ? t : null == t ? [] : [t]),
                    (r = W((r = n ? Bo : r)) ? r : null == r ? [] : [r])
                  );
            }),
            (d.over = Io),
            (d.overArgs = ar),
            (d.overEvery = To),
            (d.overSome = Oo),
            (d.partial = pi),
            (d.partialRight = hi),
            (d.partition = ti),
            (d.pick = Xi),
            (d.pickBy = Qi),
            (d.property = No),
            (d.propertyOf = function (t) {
              return function (e) {
                return null == t ? Bo : dt(t, e);
              };
            }),
            (d.pull = le),
            (d.pullAll = Cn),
            (d.pullAllBy = function (e, t, r) {
              return e && e.length && t && t.length ? zt(e, t, f(r, 2)) : e;
            }),
            (d.pullAllWith = function (e, t, r) {
              return e && e.length && t && t.length ? zt(e, t, Bo, r) : e;
            }),
            (d.pullAt = $n),
            (d.range = Co),
            (d.rangeRight = $o),
            (d.rearg = di),
            (d.reject = function (e, t) {
              return (W(e) ? ua : ut)(e, fi(f(t, 3)));
            }),
            (d.remove = function (e, t) {
              var r = [];
              if (e && e.length) {
                var n = -1,
                  i = [],
                  o = e.length;
                for (t = f(t, 3); ++n < o; ) {
                  var a = e[n];
                  t(a, n, e) && (r.push(a), i.push(n));
                }
                Lt(e, i);
              }
              return r;
            }),
            (d.rest = function (e, t) {
              if ('function' != typeof e) throw new E(Vo);
              return a(e, (t = t === Bo ? t : O(t)));
            }),
            (d.reverse = jn),
            (d.sampleSize = function (e, t, r) {
              return (
                (t = (r ? p(e, t, r) : t === Bo) ? 1 : O(t)),
                (W(e) ? qe : Bt)(e, t)
              );
            }),
            (d.set = function (e, t, r) {
              return null == e ? e : Vt(e, t, r);
            }),
            (d.setWith = function (e, t, r, n) {
              return (
                (n = 'function' == typeof n ? n : Bo),
                null == e ? e : Vt(e, t, r, n)
              );
            }),
            (d.shuffle = function (e) {
              return (W(e) ? Ge : Ut)(e);
            }),
            (d.slice = function (e, t, r) {
              var n = null == e ? 0 : e.length;
              return n
                ? ((r =
                    r && 'number' != typeof r && p(e, t, r)
                      ? ((t = 0), n)
                      : ((t = null == t ? 0 : O(t)), r === Bo ? n : O(r))),
                  s(e, t, r))
                : [];
            }),
            (d.sortBy = ri),
            (d.sortedUniq = function (e) {
              return e && e.length ? Ht(e) : [];
            }),
            (d.sortedUniqBy = function (e, t) {
              return e && e.length ? Ht(e, f(t, 2)) : [];
            }),
            (d.split = function (e, t, r) {
              return (
                r && 'number' != typeof r && p(e, t, r) && (t = r = Bo),
                (r = r === Bo ? qo : r >>> 0)
                  ? (e = h(e)) &&
                    ('string' == typeof t || (null != t && !Oi(t))) &&
                    !(t = c(t)) &&
                    ha(e)
                    ? sr(ga(e), 0, r)
                    : e.split(t, r)
                  : []
              );
            }),
            (d.spread = function (r, n) {
              if ('function' != typeof r) throw new E(Vo);
              return (
                (n = null == n ? 0 : S(O(n), 0)),
                a(function (e) {
                  var t = e[n],
                    e = sr(e, 0, n);
                  return t && la(e, t), aa(r, this, e);
                })
              );
            }),
            (d.tail = function (e) {
              var t = null == e ? 0 : e.length;
              return t ? s(e, 1, t) : [];
            }),
            (d.take = function (e, t, r) {
              return e && e.length
                ? s(e, 0, (t = r || t === Bo ? 1 : O(t)) < 0 ? 0 : t)
                : [];
            }),
            (d.takeRight = function (e, t, r) {
              var n = null == e ? 0 : e.length;
              return n
                ? s(e, (t = n - (t = r || t === Bo ? 1 : O(t))) < 0 ? 0 : t, n)
                : [];
            }),
            (d.takeRightWhile = function (e, t) {
              return e && e.length ? Qt(e, f(t, 3), !1, !0) : [];
            }),
            (d.takeWhile = function (e, t) {
              return e && e.length ? Qt(e, f(t, 3)) : [];
            }),
            (d.tap = function (e, t) {
              return t(e), e;
            }),
            (d.throttle = function (e, t, r) {
              var n = !0,
                i = !0;
              if ('function' != typeof e) throw new E(Vo);
              return (
                _(r) &&
                  ((n = 'leading' in r ? !!r.leading : n),
                  (i = 'trailing' in r ? !!r.trailing : i)),
                ui(e, t, { leading: n, maxWait: t, trailing: i })
              );
            }),
            (d.thru = Un),
            (d.toArray = Ai),
            (d.toPairs = eo),
            (d.toPairsIn = to),
            (d.toPath = function (e) {
              return W(e) ? ca(e, xn) : y(e) ? [e] : T(_n(h(e)));
            }),
            (d.toPlainObject = zi),
            (d.transform = function (e, n, i) {
              var t,
                r = W(e),
                o = r || yi(e) || $i(e);
              return (
                (n = f(n, 4)),
                null == i &&
                  ((t = e && e.constructor),
                  (i = o
                    ? r
                      ? new t()
                      : []
                    : _(e) && _i(t)
                    ? ze(re(e))
                    : {})),
                (o ? sa : ft)(e, function (e, t, r) {
                  return n(i, e, t, r);
                }),
                i
              );
            }),
            (d.unary = function (e) {
              return ii(e, 1);
            }),
            (d.union = kn),
            (d.unionBy = An),
            (d.unionWith = Pn),
            (d.uniq = function (e) {
              return e && e.length ? Yt(e) : [];
            }),
            (d.uniqBy = function (e, t) {
              return e && e.length ? Yt(e, f(t, 2)) : [];
            }),
            (d.uniqWith = function (e, t) {
              return (
                (t = 'function' == typeof t ? t : Bo),
                e && e.length ? Yt(e, Bo, t) : []
              );
            }),
            (d.unset = function (e, t) {
              return null == e || Jt(e, t);
            }),
            (d.unzip = Rn),
            (d.unzipWith = zn),
            (d.update = function (e, t, r) {
              return null == e ? e : Xt(e, t, ir(r));
            }),
            (d.updateWith = function (e, t, r, n) {
              return (
                (n = 'function' == typeof n ? n : Bo),
                null == e ? e : Xt(e, t, ir(r), n)
              );
            }),
            (d.values = ro),
            (d.valuesIn = function (e) {
              return null == e ? [] : Zs(e, $(e));
            }),
            (d.without = Ln),
            (d.words = ho),
            (d.wrap = function (e, t) {
              return pi(ir(t), e);
            }),
            (d.xor = Mn),
            (d.xorBy = Dn),
            (d.xorWith = Wn),
            (d.zip = Bn),
            (d.zipObject = function (e, t) {
              return rr(e || [], t || [], He);
            }),
            (d.zipObjectDeep = function (e, t) {
              return rr(e || [], t || [], Vt);
            }),
            (d.zipWith = Vn),
            (d.entries = eo),
            (d.entriesIn = to),
            (d.extend = Mi),
            (d.extendWith = Di),
            Eo(d, d),
            (d.add = Ao),
            (d.attempt = mo),
            (d.camelCase = no),
            (d.capitalize = io),
            (d.ceil = Po),
            (d.clamp = function (e, t, r) {
              return (
                r === Bo && ((r = t), (t = Bo)),
                r !== Bo && (r = (r = N(r)) == r ? r : 0),
                t !== Bo && (t = (t = N(t)) == t ? t : 0),
                et(N(e), t, r)
              );
            }),
            (d.clone = function (e) {
              return v(e, 4);
            }),
            (d.cloneDeep = function (e) {
              return v(e, 5);
            }),
            (d.cloneDeepWith = function (e, t) {
              return v(e, 5, (t = 'function' == typeof t ? t : Bo));
            }),
            (d.cloneWith = function (e, t) {
              return v(e, 4, (t = 'function' == typeof t ? t : Bo));
            }),
            (d.conformsTo = function (e, t) {
              return null == t || tt(e, t, C(t));
            }),
            (d.deburr = oo),
            (d.defaultTo = function (e, t) {
              return null == e || e != e ? t : e;
            }),
            (d.divide = Ro),
            (d.endsWith = function (e, t, r) {
              (e = h(e)), (t = c(t));
              var n = e.length,
                n = (r = r === Bo ? n : et(O(r), 0, n));
              return 0 <= (r -= t.length) && e.slice(r, n) == t;
            }),
            (d.eq = D),
            (d.escape = function (e) {
              return (e = h(e)) && Ua.test(e) ? e.replace(Va, eu) : e;
            }),
            (d.escapeRegExp = function (e) {
              return (e = h(e)) && Xa.test(e) ? e.replace(Ja, '\\$&') : e;
            }),
            (d.every = function (e, t, r) {
              return (W(e) ? As : at)(e, f((t = r && p(e, t, r) ? Bo : t), 3));
            }),
            (d.find = Kn),
            (d.findIndex = In),
            (d.findKey = function (e, t) {
              return Ds(e, f(t, 3), ft);
            }),
            (d.findLast = Hn),
            (d.findLastIndex = Tn),
            (d.findLastKey = function (e, t) {
              return Ds(e, f(t, 3), pt);
            }),
            (d.floor = zo),
            (d.forEach = Zn),
            (d.forEachRight = Yn),
            (d.forIn = function (e, t) {
              return null == e ? e : ct(e, f(t, 3), $);
            }),
            (d.forInRight = function (e, t) {
              return null == e ? e : lt(e, f(t, 3), $);
            }),
            (d.forOwn = function (e, t) {
              return e && ft(e, f(t, 3));
            }),
            (d.forOwnRight = function (e, t) {
              return e && pt(e, f(t, 3));
            }),
            (d.get = Ui),
            (d.gt = mi),
            (d.gte = gi),
            (d.has = function (e, t) {
              return null != e && en(e, t, bt);
            }),
            (d.hasIn = qi),
            (d.head = Nn),
            (d.identity = j),
            (d.includes = function (e, t, r, n) {
              return (
                (e = l(e) ? e : ro(e)),
                (r = r && !n ? O(r) : 0),
                (n = e.length),
                r < 0 && (r = S(n + r, 0)),
                Ci(e) ? r <= n && -1 < e.indexOf(t, r) : !!n && -1 < fa(e, t, r)
              );
            }),
            (d.indexOf = function (e, t, r) {
              var n = null == e ? 0 : e.length;
              return n
                ? fa(
                    e,
                    t,
                    (e = (e = null == r ? 0 : O(r)) < 0 ? S(n + e, 0) : e)
                  )
                : -1;
            }),
            (d.inRange = function (e, t, r) {
              return (
                (t = Pi(t)),
                r === Bo ? ((r = t), (t = 0)) : (r = Pi(r)),
                (e = e = N(e)) >= I((t = t), (r = r)) && e < S(t, r)
              );
            }),
            (d.invoke = Hi),
            (d.isArguments = bi),
            (d.isArray = W),
            (d.isArrayBuffer = vi),
            (d.isArrayLike = l),
            (d.isArrayLikeObject = w),
            (d.isBoolean = function (e) {
              return !0 === e || !1 === e || (B(e) && r(e) == Ko);
            }),
            (d.isBuffer = yi),
            (d.isDate = U),
            (d.isElement = function (e) {
              return B(e) && 1 === e.nodeType && !Ti(e);
            }),
            (d.isEmpty = function (e) {
              if (null != e) {
                if (
                  l(e) &&
                  (W(e) ||
                    'string' == typeof e ||
                    'function' == typeof e.splice ||
                    yi(e) ||
                    $i(e) ||
                    bi(e))
                )
                  return !e.length;
                var t,
                  r = M(e);
                if (r == Zo || r == Qo) return !e.size;
                if (un(e)) return !Tt(e).length;
                for (t in e) if (z.call(e, t)) return !1;
              }
              return !0;
            }),
            (d.isEqual = function (e, t) {
              return xt(e, t);
            }),
            (d.isEqualWith = function (e, t, r) {
              var n = (r = 'function' == typeof r ? r : Bo) ? r(e, t) : Bo;
              return n === Bo ? xt(e, t, Bo, r) : !!n;
            }),
            (d.isError = wi),
            (d.isFinite = function (e) {
              return 'number' == typeof e && ge(e);
            }),
            (d.isFunction = _i),
            (d.isInteger = xi),
            (d.isLength = Ei),
            (d.isMap = Si),
            (d.isMatch = function (e, t) {
              return e === t || Et(e, t, Yr(t));
            }),
            (d.isMatchWith = function (e, t, r) {
              return (r = 'function' == typeof r ? r : Bo), Et(e, t, Yr(t), r);
            }),
            (d.isNaN = function (e) {
              return Ii(e) && e != +e;
            }),
            (d.isNative = function (e) {
              if (sn(e))
                throw new k(
                  'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.'
                );
              return St(e);
            }),
            (d.isNil = function (e) {
              return null == e;
            }),
            (d.isNull = function (e) {
              return null === e;
            }),
            (d.isNumber = Ii),
            (d.isObject = _),
            (d.isObjectLike = B),
            (d.isPlainObject = Ti),
            (d.isRegExp = Oi),
            (d.isSafeInteger = function (e) {
              return xi(e) && -Uo <= e && e <= Uo;
            }),
            (d.isSet = Ni),
            (d.isString = Ci),
            (d.isSymbol = y),
            (d.isTypedArray = $i),
            (d.isUndefined = function (e) {
              return e === Bo;
            }),
            (d.isWeakMap = function (e) {
              return B(e) && M(e) == ta;
            }),
            (d.isWeakSet = function (e) {
              return B(e) && '[object WeakSet]' == r(e);
            }),
            (d.join = function (e, t) {
              return null == e ? '' : be.call(e, t);
            }),
            (d.kebabCase = ao),
            (d.last = n),
            (d.lastIndexOf = function (e, t, r) {
              var n = null == e ? 0 : e.length;
              if (!n) return -1;
              var i = n;
              if (
                (r !== Bo && (i = (i = O(r)) < 0 ? S(n + i, 0) : I(i, n - 1)),
                t != t)
              )
                return Ws(e, Vs, i, !0);
              for (var o = e, a = t, s = i + 1; s--; ) if (o[s] === a) return s;
              return s;
            }),
            (d.lowerCase = so),
            (d.lowerFirst = uo),
            (d.lt = ji),
            (d.lte = ki),
            (d.max = function (e) {
              return e && e.length ? st(e, j, gt) : Bo;
            }),
            (d.maxBy = function (e, t) {
              return e && e.length ? st(e, f(t, 2), gt) : Bo;
            }),
            (d.mean = function (e) {
              return Fs(e, j);
            }),
            (d.meanBy = function (e, t) {
              return Fs(e, f(t, 2));
            }),
            (d.min = function (e) {
              return e && e.length ? st(e, j, Nt) : Bo;
            }),
            (d.minBy = function (e, t) {
              return e && e.length ? st(e, f(t, 2), Nt) : Bo;
            }),
            (d.stubArray = jo),
            (d.stubFalse = ko),
            (d.stubObject = function () {
              return {};
            }),
            (d.stubString = function () {
              return '';
            }),
            (d.stubTrue = function () {
              return !0;
            }),
            (d.multiply = Mo),
            (d.nth = function (e, t) {
              return e && e.length ? At(e, O(t)) : Bo;
            }),
            (d.noConflict = function () {
              return oa._ === this && (oa._ = X), this;
            }),
            (d.noop = So),
            (d.now = ni),
            (d.pad = function (e, t, r) {
              e = h(e);
              var n = (t = O(t)) ? ma(e) : 0;
              return !t || t <= n
                ? e
                : $r(de((t = (t - n) / 2)), r) + e + $r(he(t), r);
            }),
            (d.padEnd = function (e, t, r) {
              e = h(e);
              var n = (t = O(t)) ? ma(e) : 0;
              return t && n < t ? e + $r(t - n, r) : e;
            }),
            (d.padStart = function (e, t, r) {
              e = h(e);
              var n = (t = O(t)) ? ma(e) : 0;
              return t && n < t ? $r(t - n, r) + e : e;
            }),
            (d.parseInt = function (e, t, r) {
              return (
                (t = r || null == t ? 0 : t && +t),
                we(h(e).replace(Qa, ''), t || 0)
              );
            }),
            (d.random = function (e, t, r) {
              var n;
              return (
                r && 'boolean' != typeof r && p(e, t, r) && (t = r = Bo),
                r === Bo &&
                  ('boolean' == typeof t
                    ? ((r = t), (t = Bo))
                    : 'boolean' == typeof e && ((r = e), (e = Bo))),
                e === Bo && t === Bo
                  ? ((e = 0), (t = 1))
                  : ((e = Pi(e)), t === Bo ? ((t = e), (e = 0)) : (t = Pi(t))),
                t < e && ((n = e), (e = t), (t = n)),
                r || e % 1 || t % 1
                  ? ((n = _e()),
                    I(e + n * (t - e + xs('1e-' + ((n + '').length - 1))), t))
                  : Mt(e, t)
              );
            }),
            (d.reduce = function (e, t, r) {
              var n = W(e) ? zs : qs,
                i = arguments.length < 3;
              return n(e, f(t, 4), r, i, it);
            }),
            (d.reduceRight = function (e, t, r) {
              var n = W(e) ? Ls : qs,
                i = arguments.length < 3;
              return n(e, f(t, 4), r, i, ot);
            }),
            (d.repeat = function (e, t, r) {
              return (t = (r ? p(e, t, r) : t === Bo) ? 1 : O(t)), Dt(h(e), t);
            }),
            (d.replace = function () {
              var e = arguments,
                t = h(e[0]);
              return e.length < 3 ? t : t.replace(e[1], e[2]);
            }),
            (d.result = function (e, t, r) {
              var n = -1,
                i = (t = or(t, e)).length;
              for (i || ((i = 1), (e = Bo)); ++n < i; ) {
                var o = null == e ? Bo : e[xn(t[n])];
                o === Bo && ((n = i), (o = r)), (e = _i(o) ? o.call(e) : o);
              }
              return e;
            }),
            (d.round = Do),
            (d.runInContext = i),
            (d.sample = function (e) {
              return (W(e) ? Ue : Wt)(e);
            }),
            (d.size = function (e) {
              var t;
              return null == e
                ? 0
                : l(e)
                ? Ci(e)
                  ? ma(e)
                  : e.length
                : (t = M(e)) == Zo || t == Qo
                ? e.size
                : Tt(e).length;
            }),
            (d.snakeCase = co),
            (d.some = function (e, t, r) {
              return (W(e) ? Ms : qt)(e, f((t = r && p(e, t, r) ? Bo : t), 3));
            }),
            (d.sortedIndex = function (e, t) {
              return Gt(e, t);
            }),
            (d.sortedIndexBy = function (e, t, r) {
              return Kt(e, t, f(r, 2));
            }),
            (d.sortedIndexOf = function (e, t) {
              var r = null == e ? 0 : e.length;
              if (r) {
                var n = Gt(e, t);
                if (n < r && D(e[n], t)) return n;
              }
              return -1;
            }),
            (d.sortedLastIndex = function (e, t) {
              return Gt(e, t, !0);
            }),
            (d.sortedLastIndexBy = function (e, t, r) {
              return Kt(e, t, f(r, 2), !0);
            }),
            (d.sortedLastIndexOf = function (e, t) {
              if (null == e ? 0 : e.length) {
                var r = Gt(e, t, !0) - 1;
                if (D(e[r], t)) return r;
              }
              return -1;
            }),
            (d.startCase = lo),
            (d.startsWith = function (e, t, r) {
              return (
                (e = h(e)),
                (r = null == r ? 0 : et(O(r), 0, e.length)),
                (t = c(t)),
                e.slice(r, r + t.length) == t
              );
            }),
            (d.subtract = Wo),
            (d.sum = function (e) {
              return e && e.length ? Gs(e, j) : 0;
            }),
            (d.sumBy = function (e, t) {
              return e && e.length ? Gs(e, f(t, 2)) : 0;
            }),
            (d.template = function (a, e, t) {
              var s,
                u,
                r = d.templateSettings;
              t && p(a, e, t) && (e = Bo), (a = h(a)), (e = Di({}, e, r, Dr));
              var n = C((t = Di({}, e.imports, r.imports, Dr))),
                i = Zs(t, n),
                c = 0,
                r = e.interpolate || ds,
                l = "__p += '",
                t = R(
                  (e.escape || ds).source +
                    '|' +
                    r.source +
                    '|' +
                    (r === Ka ? as : ds).source +
                    '|' +
                    (e.evaluate || ds).source +
                    '|$',
                  'g'
                ),
                o =
                  '//# sourceURL=' +
                  (z.call(e, 'sourceURL')
                    ? (e.sourceURL + '').replace(/\s/g, ' ')
                    : 'lodash.templateSources[' + ++_s + ']') +
                  '\n';
              if (
                (a.replace(t, function (e, t, r, n, i, o) {
                  return (
                    (r = r || n),
                    (l += a.slice(c, o).replace(ms, tu)),
                    t && ((s = !0), (l += "' +\n__e(" + t + ") +\n'")),
                    i && ((u = !0), (l += "';\n" + i + ";\n__p += '")),
                    r &&
                      (l +=
                        "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"),
                    (c = o + e.length),
                    e
                  );
                }),
                (l += "';\n"),
                (r = z.call(e, 'variable') && e.variable))
              ) {
                if (is.test(r))
                  throw new k(
                    'Invalid `variable` option passed into `_.template`'
                  );
              } else l = 'with (obj) {\n' + l + '\n}\n';
              if (
                ((l = (u ? l.replace(Ma, '') : l)
                  .replace(Da, '$1')
                  .replace(Wa, '$1;')),
                (l =
                  'function(' +
                  (r || 'obj') +
                  ') {\n' +
                  (r ? '' : 'obj || (obj = {});\n') +
                  "var __t, __p = ''" +
                  (s ? ', __e = _.escape' : '') +
                  (u
                    ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
                    : ';\n') +
                  l +
                  'return __p\n}'),
                ((t = mo(function () {
                  return A(n, o + 'return ' + l).apply(Bo, i);
                })).source = l),
                wi(t))
              )
                throw t;
              return t;
            }),
            (d.times = function (e, t) {
              if ((e = O(e)) < 1 || Uo < e) return [];
              for (
                var r = qo, n = I(e, qo), n = ((t = f(t)), (e -= qo), Ks(n, t));
                ++r < e;

              )
                t(r);
              return n;
            }),
            (d.toFinite = Pi),
            (d.toInteger = O),
            (d.toLength = Ri),
            (d.toLower = function (e) {
              return h(e).toLowerCase();
            }),
            (d.toNumber = N),
            (d.toSafeInteger = function (e) {
              return e ? et(O(e), -Uo, Uo) : 0 === e ? e : 0;
            }),
            (d.toString = h),
            (d.toUpper = function (e) {
              return h(e).toUpperCase();
            }),
            (d.trim = function (e, t, r) {
              return (e = h(e)) && (r || t === Bo)
                ? Hs(e)
                : e && (t = c(t))
                ? sr((r = ga(e)), Js(r, (t = ga(t))), Xs(r, t) + 1).join('')
                : e;
            }),
            (d.trimEnd = function (e, t, r) {
              return (e = h(e)) && (r || t === Bo)
                ? e.slice(0, ou(e) + 1)
                : e && (t = c(t))
                ? sr((r = ga(e)), 0, Xs(r, ga(t)) + 1).join('')
                : e;
            }),
            (d.trimStart = function (e, t, r) {
              return (e = h(e)) && (r || t === Bo)
                ? e.replace(Qa, '')
                : e && (t = c(t))
                ? sr((r = ga(e)), Js(r, ga(t))).join('')
                : e;
            }),
            (d.truncate = function (e, t) {
              var r,
                n = 30,
                i = '...',
                t =
                  (_(t) &&
                    ((r = 'separator' in t ? t.separator : r),
                    (n = 'length' in t ? O(t.length) : n),
                    (i = 'omission' in t ? c(t.omission) : i)),
                  (e = h(e)).length);
              if ((t = ha(e) ? (o = ga(e)).length : t) <= n) return e;
              if ((t = n - ma(i)) < 1) return i;
              var o,
                n = o ? sr(o, 0, t).join('') : e.slice(0, t);
              if (r !== Bo)
                if ((o && (t += n.length - t), Oi(r))) {
                  if (e.slice(t).search(r)) {
                    var a,
                      s = n;
                    for (
                      (r = r.global
                        ? r
                        : R(r.source, h(ss.exec(r)) + 'g')).lastIndex = 0;
                      (a = r.exec(s));

                    )
                      var u = a.index;
                    n = n.slice(0, u === Bo ? t : u);
                  }
                } else
                  e.indexOf(c(r), t) != t &&
                    -1 < (o = n.lastIndexOf(r)) &&
                    (n = n.slice(0, o));
              return n + i;
            }),
            (d.unescape = function (e) {
              return (e = h(e)) && Fa.test(e) ? e.replace(Ba, au) : e;
            }),
            (d.uniqueId = function (e) {
              var t = ++H;
              return h(e) + t;
            }),
            (d.upperCase = fo),
            (d.upperFirst = po),
            (d.each = Zn),
            (d.eachRight = Yn),
            (d.first = Nn),
            Eo(
              d,
              ((Lo = {}),
              ft(d, function (e, t) {
                z.call(d.prototype, t) || (Lo[t] = e);
              }),
              Lo),
              { chain: !1 }
            ),
            (d.VERSION = '4.17.21'),
            sa(
              [
                'bind',
                'bindKey',
                'curry',
                'curryRight',
                'partial',
                'partialRight',
              ],
              function (e) {
                d[e].placeholder = d;
              }
            ),
            sa(['drop', 'take'], function (r, n) {
              (b.prototype[r] = function (e) {
                e = e === Bo ? 1 : S(O(e), 0);
                var t = this.__filtered__ && !n ? new b(this) : this.clone();
                return (
                  t.__filtered__
                    ? (t.__takeCount__ = I(e, t.__takeCount__))
                    : t.__views__.push({
                        size: I(e, qo),
                        type: r + (t.__dir__ < 0 ? 'Right' : ''),
                      }),
                  t
                );
              }),
                (b.prototype[r + 'Right'] = function (e) {
                  return this.reverse()[r](e).reverse();
                });
            }),
            sa(['filter', 'map', 'takeWhile'], function (e, t) {
              var r = t + 1,
                n = 1 == r || 3 == r;
              b.prototype[e] = function (e) {
                var t = this.clone();
                return (
                  t.__iteratees__.push({ iteratee: f(e, 3), type: r }),
                  (t.__filtered__ = t.__filtered__ || n),
                  t
                );
              };
            }),
            sa(['head', 'last'], function (e, t) {
              var r = 'take' + (t ? 'Right' : '');
              b.prototype[e] = function () {
                return this[r](1).value()[0];
              };
            }),
            sa(['initial', 'tail'], function (e, t) {
              var r = 'drop' + (t ? '' : 'Right');
              b.prototype[e] = function () {
                return this.__filtered__ ? new b(this) : this[r](1);
              };
            }),
            (b.prototype.compact = function () {
              return this.filter(j);
            }),
            (b.prototype.find = function (e) {
              return this.filter(e).head();
            }),
            (b.prototype.findLast = function (e) {
              return this.reverse().find(e);
            }),
            (b.prototype.invokeMap = a(function (t, r) {
              return 'function' == typeof t
                ? new b(this)
                : this.map(function (e) {
                    return wt(e, t, r);
                  });
            })),
            (b.prototype.reject = function (e) {
              return this.filter(fi(f(e)));
            }),
            (b.prototype.slice = function (e, t) {
              e = O(e);
              var r = this;
              return r.__filtered__ && (0 < e || t < 0)
                ? new b(r)
                : (e < 0 ? (r = r.takeRight(-e)) : e && (r = r.drop(e)),
                  t !== Bo
                    ? (t = O(t)) < 0
                      ? r.dropRight(-t)
                      : r.take(t - e)
                    : r);
            }),
            (b.prototype.takeRightWhile = function (e) {
              return this.reverse().takeWhile(e).reverse();
            }),
            (b.prototype.toArray = function () {
              return this.take(qo);
            }),
            ft(b.prototype, function (c, e) {
              var l = /^(?:filter|find|map|reject)|While$/.test(e),
                f = /^(?:head|last)$/.test(e),
                p = d[f ? 'take' + ('last' == e ? 'Right' : '') : e],
                h = f || /^find/.test(e);
              p &&
                (d.prototype[e] = function () {
                  function e(e) {
                    return (e = p.apply(d, la([e], n))), f && s ? e[0] : e;
                  }
                  var t,
                    r = this.__wrapped__,
                    n = f ? [1] : arguments,
                    i = r instanceof b,
                    o = n[0],
                    a = i || W(r),
                    s =
                      (a &&
                        l &&
                        'function' == typeof o &&
                        1 != o.length &&
                        (i = a = !1),
                      this.__chain__),
                    o = !!this.__actions__.length,
                    u = h && !s,
                    i = i && !o;
                  return !h && a
                    ? ((r = i ? r : new b(this)),
                      (t = c.apply(r, n)).__actions__.push({
                        func: Un,
                        args: [e],
                        thisArg: Bo,
                      }),
                      new g(t, s))
                    : u && i
                    ? c.apply(this, n)
                    : ((t = this.thru(e)),
                      u ? (f ? t.value()[0] : t.value()) : t);
                });
            }),
            sa(
              ['pop', 'push', 'shift', 'sort', 'splice', 'unshift'],
              function (e) {
                var r = F[e],
                  n = /^(?:push|sort|unshift)$/.test(e) ? 'tap' : 'thru',
                  i = /^(?:pop|shift)$/.test(e);
                d.prototype[e] = function () {
                  var e,
                    t = arguments;
                  return i && !this.__chain__
                    ? ((e = this.value()), r.apply(W(e) ? e : [], t))
                    : this[n](function (e) {
                        return r.apply(W(e) ? e : [], t);
                      });
                };
              }
            ),
            ft(b.prototype, function (e, t) {
              var r,
                n = d[t];
              n &&
                ((r = n.name + ''),
                z.call(Ne, r) || (Ne[r] = []),
                Ne[r].push({ name: t, func: n }));
            }),
            (Ne[Tr(Bo, 2).name] = [{ name: 'wrapper', func: Bo }]),
            (b.prototype.clone = function () {
              var e = new b(this.__wrapped__);
              return (
                (e.__actions__ = T(this.__actions__)),
                (e.__dir__ = this.__dir__),
                (e.__filtered__ = this.__filtered__),
                (e.__iteratees__ = T(this.__iteratees__)),
                (e.__takeCount__ = this.__takeCount__),
                (e.__views__ = T(this.__views__)),
                e
              );
            }),
            (b.prototype.reverse = function () {
              var e;
              return (
                this.__filtered__
                  ? (((e = new b(this)).__dir__ = -1), (e.__filtered__ = !0))
                  : ((e = this.clone()).__dir__ *= -1),
                e
              );
            }),
            (b.prototype.value = function () {
              var e = this.__wrapped__.value(),
                t = this.__dir__,
                r = W(e),
                n = t < 0,
                i = r ? e.length : 0,
                o = (function (e, t, r) {
                  var n = -1,
                    i = r.length;
                  for (; ++n < i; ) {
                    var o = r[n],
                      a = o.size;
                    switch (o.type) {
                      case 'drop':
                        e += a;
                        break;
                      case 'dropRight':
                        t -= a;
                        break;
                      case 'take':
                        t = I(t, e + a);
                        break;
                      case 'takeRight':
                        e = S(e, t - a);
                    }
                  }
                  return { start: e, end: t };
                })(0, i, this.__views__),
                a = o.start,
                s = (o = o.end) - a,
                u = n ? o : a - 1,
                c = this.__iteratees__,
                l = c.length,
                f = 0,
                p = I(s, this.__takeCount__);
              if (!r || (!n && i == s && p == s))
                return er(e, this.__actions__);
              var h = [];
              e: for (; s-- && f < p; ) {
                for (var d = -1, m = e[(u += t)]; ++d < l; ) {
                  var g = c[d],
                    b = g.iteratee,
                    g = g.type,
                    b = b(m);
                  if (2 == g) m = b;
                  else if (!b) {
                    if (1 == g) continue e;
                    break e;
                  }
                }
                h[f++] = m;
              }
              return h;
            }),
            (d.prototype.at = qn),
            (d.prototype.chain = function () {
              return Fn(this);
            }),
            (d.prototype.commit = function () {
              return new g(this.value(), this.__chain__);
            }),
            (d.prototype.next = function () {
              this.__values__ === Bo && (this.__values__ = Ai(this.value()));
              var e = this.__index__ >= this.__values__.length;
              return {
                done: e,
                value: e ? Bo : this.__values__[this.__index__++],
              };
            }),
            (d.prototype.plant = function (e) {
              for (var t, r = this; r instanceof Me; )
                var n = Sn(r),
                  i =
                    ((n.__index__ = 0),
                    (n.__values__ = Bo),
                    t ? (i.__wrapped__ = n) : (t = n),
                    n),
                  r = r.__wrapped__;
              return (i.__wrapped__ = e), t;
            }),
            (d.prototype.reverse = function () {
              var e = this.__wrapped__;
              return e instanceof b
                ? ((e = e),
                  (e = (e = this.__actions__.length
                    ? new b(this)
                    : e).reverse()).__actions__.push({
                    func: Un,
                    args: [jn],
                    thisArg: Bo,
                  }),
                  new g(e, this.__chain__))
                : this.thru(jn);
            }),
            (d.prototype.toJSON =
              d.prototype.valueOf =
              d.prototype.value =
                function () {
                  return er(this.__wrapped__, this.__actions__);
                }),
            (d.prototype.first = d.prototype.head),
            se &&
              (d.prototype[se] = function () {
                return this;
              }),
            d
          );
        })();
        i ? (((i.exports = ba)._ = ba), (n._ = ba)) : (oa._ = ba);
      }.call(commonjsGlobal);
    })(lodash, lodash.exports),
    lodash.exports);
const getTextEffectStyle = (e, t, r, n) => {
    var i,
      o,
      a,
      s = {};
    return (
      'shadow' === e
        ? ((a = new Color(t.color)),
          (o = ((t.direction || 0) * Math.PI) / 180),
          (i = 0.00183334 * (t.offset || 0) * n * Math.sin(o)),
          (o = 0.00183334 * (t.offset || 0) * n * Math.cos(o)),
          (s.textShadow = `${a
            .alpha((t.transparency || 0) / 100)
            .toRgbString()} ${i}px ${o}px ${t.blur}px`))
        : 'lift' === e
        ? (s.textShadow = `rgba(0, 0, 0, ${
            0.05 + 0.005 * ((null == t ? void 0 : t.intensity) || 0)
          }) 0px ${Math.max(0.45, 0.05 * n)}px ${
            Math.max(0.45, 0.05 * n) +
            0.065 * ((null == t ? void 0 : t.intensity) || 0)
          }px; filter: opacity(1)`)
        : 'hollow' === e
        ? ((s.caretColor = r),
          (s.WebkitTextFillColor = 'transparent'),
          (s.WebkitTextStroke =
            (0.0091666 +
              833325e-9 * ((null == t ? void 0 : t.thickness) || 0)) *
              n +
            'px ' +
            r))
        : 'splice' === e
        ? ((s.caretColor = r),
          (s.WebkitTextFillColor = 'transparent'),
          (a = (null == t ? void 0 : t.thickness) || 0),
          (s.WebkitTextStroke =
            0.00916666 * Math.max(8, n) + 83333e-8 * n * a + 'px ' + r),
          (i = (((null == t ? void 0 : t.direction) || 0) * Math.PI) / 180),
          (o =
            0.00183334 *
            ((null == t ? void 0 : t.offset) || 0) *
            n *
            Math.sin(i)),
          (a =
            0.00183334 *
            ((null == t ? void 0 : t.offset) || 0) *
            n *
            Math.cos(i)),
          (s.textShadow = t.color + ` ${o}px ${a}px 0px`))
        : 'outline' !== e &&
          'echo' === e &&
          ((r = new Color(t.color)),
          (i = (((null == t ? void 0 : t.direction) || 0) * Math.PI) / 180),
          (o =
            0.00166666 *
            ((null == t ? void 0 : t.offset) || 0) *
            n *
            Math.sin(i)),
          (a =
            0.00166666 *
            ((null == t ? void 0 : t.offset) || 0) *
            n *
            Math.cos(i)),
          (s.textShadow = `${r.alpha(0.5).toRgbString()} ${o}px ${a}px 0px, ${r
            .alpha(0.3)
            .toRgbString()} ${2 * o}px ${2 * a}px 0px`)),
      s
    );
  },
  getTransformStyle = (e) => {
    var t = [];
    return (
      e.position && t.push(`translate(${e.position.x}px, ${e.position.y}px)`),
      e.scale && t.push(`scale(${e.scale})`),
      e.rotate && t.push(`rotate(${e.rotate}deg)`),
      t.join(' ')
    );
  },
  getUsedFonts = (e) => {
    const t = [];
    return (
      e.forEach((e) => {
        Object.entries(e.layers).forEach(([, e]) => {
          'TextLayer' === e.type.resolvedName && t.push(...e.props.fonts);
        });
      }),
      lodashExports.uniqWith(t, lodashExports.isEqual)
    );
  };
var pkg = {
    name: '@emotion/react',
    version: '11.11.1',
    main: 'dist/emotion-react.cjs.js',
    module: 'dist/emotion-react.esm.js',
    browser: {
      './dist/emotion-react.esm.js': './dist/emotion-react.browser.esm.js',
    },
    exports: {
      '.': {
        module: {
          worker: './dist/emotion-react.worker.esm.js',
          browser: './dist/emotion-react.browser.esm.js',
          default: './dist/emotion-react.esm.js',
        },
        import: './dist/emotion-react.cjs.mjs',
        default: './dist/emotion-react.cjs.js',
      },
      './jsx-runtime': {
        module: {
          worker: './jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js',
          browser:
            './jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
          default: './jsx-runtime/dist/emotion-react-jsx-runtime.esm.js',
        },
        import: './jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs',
        default: './jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js',
      },
      './_isolated-hnrs': {
        module: {
          worker:
            './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js',
          browser:
            './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js',
          default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js',
        },
        import: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs',
        default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js',
      },
      './jsx-dev-runtime': {
        module: {
          worker:
            './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js',
          browser:
            './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js',
          default:
            './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js',
        },
        import: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs',
        default: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js',
      },
      './package.json': './package.json',
      './types/css-prop': './types/css-prop.d.ts',
      './macro': {
        types: { import: './macro.d.mts', default: './macro.d.ts' },
        default: './macro.js',
      },
    },
    types: 'types/index.d.ts',
    files: [
      'src',
      'dist',
      'jsx-runtime',
      'jsx-dev-runtime',
      '_isolated-hnrs',
      'types/*.d.ts',
      'macro.*',
    ],
    sideEffects: !1,
    author: 'Emotion Contributors',
    license: 'MIT',
    scripts: { 'test:typescript': 'dtslint types' },
    dependencies: {
      '@babel/runtime': '^7.18.3',
      '@emotion/babel-plugin': '^11.11.0',
      '@emotion/cache': '^11.11.0',
      '@emotion/serialize': '^1.1.2',
      '@emotion/use-insertion-effect-with-fallbacks': '^1.0.1',
      '@emotion/utils': '^1.2.1',
      '@emotion/weak-memoize': '^0.3.1',
      'hoist-non-react-statics': '^3.3.1',
    },
    peerDependencies: { react: '>=16.8.0' },
    peerDependenciesMeta: { '@types/react': { optional: !0 } },
    devDependencies: {
      '@definitelytyped/dtslint': '0.0.112',
      '@emotion/css': '11.11.0',
      '@emotion/css-prettifier': '1.1.3',
      '@emotion/server': '11.11.0',
      '@emotion/styled': '11.11.0',
      'html-tag-names': '^1.1.2',
      react: '16.14.0',
      'svg-tag-names': '^1.1.1',
      typescript: '^4.5.5',
    },
    repository:
      'https://github.com/emotion-js/emotion/tree/main/packages/react',
    publishConfig: { access: 'public' },
    'umd:main': 'dist/emotion-react.umd.min.js',
    preconstruct: {
      entrypoints: [
        './index.js',
        './jsx-runtime.js',
        './jsx-dev-runtime.js',
        './_isolated-hnrs.js',
      ],
      umdName: 'emotionReact',
      exports: {
        envConditions: ['browser', 'worker'],
        extra: {
          './types/css-prop': './types/css-prop.d.ts',
          './macro': {
            types: { import: './macro.d.mts', default: './macro.d.ts' },
            default: './macro.js',
          },
        },
      },
    },
  },
  warnedAboutCssPropForGlobal = !1,
  Global = withEmotionCache(function (e, i) {
    'production' === process.env.NODE_ENV ||
      warnedAboutCssPropForGlobal ||
      (!e.className && !e.css) ||
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
      ),
      (warnedAboutCssPropForGlobal = !0));
    var o,
      e = e.styles,
      a = serializeStyles([e], void 0, React$1.useContext(ThemeContext));
    if (isBrowser$2)
      return (
        (o = React$1.useRef()),
        useInsertionEffectWithLayoutFallback(
          function () {
            var e = i.key + '-global',
              t = new i.sheet.constructor({
                key: e,
                nonce: i.sheet.nonce,
                container: i.sheet.container,
                speedy: i.sheet.isSpeedy,
              }),
              r = !1,
              n = document.querySelector(
                'style[data-emotion="' + e + ' ' + a.name + '"]'
              );
            return (
              i.sheet.tags.length && (t.before = i.sheet.tags[0]),
              null !== n &&
                ((r = !0), n.setAttribute('data-emotion', e), t.hydrate([n])),
              (o.current = [t, r]),
              function () {
                t.flush();
              }
            );
          },
          [i]
        ),
        useInsertionEffectWithLayoutFallback(
          function () {
            var e = o.current,
              t = e[0];
            e[1]
              ? (e[1] = !1)
              : (void 0 !== a.next && insertStyles(i, a.next, !0),
                t.tags.length &&
                  ((e = t.tags[t.tags.length - 1].nextElementSibling),
                  (t.before = e),
                  t.flush()),
                i.insert('', a, t, !1));
          },
          [i, a.name]
        ),
        null
      );
    for (var t = a.name, r = a.styles, n = a.next; void 0 !== n; )
      (t += ' ' + n.name), (r += n.styles), (n = n.next);
    var e = !0 === i.compat,
      s = i.insert('', { name: t, styles: r }, i.sheet, e);
    return e
      ? null
      : React$1.createElement(
          'style',
          (((e = {})['data-emotion'] = i.key + '-global ' + t),
          (e.dangerouslySetInnerHTML = { __html: s }),
          (e.nonce = i.sheet.nonce),
          e)
        );
  });
function css() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return serializeStyles(t);
}
'production' !== process.env.NODE_ENV && (Global.displayName = 'EmotionGlobal');
var classnames = function e(t) {
  for (var r = t.length, n = 0, i = ''; n < r; n++) {
    var o = t[n];
    if (null != o) {
      var a = void 0;
      switch (typeof o) {
        case 'boolean':
          break;
        case 'object':
          if (Array.isArray(o)) a = e(o);
          else
            for (var s in ('production' !== process.env.NODE_ENV &&
              void 0 !== o.styles &&
              void 0 !== o.name &&
              console.error(
                'You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.'
              ),
            (a = ''),
            o))
              o[s] && s && (a && (a += ' '), (a += s));
          break;
        default:
          a = o;
      }
      a && (i && (i += ' '), (i += a));
    }
  }
  return i;
};
function merge(e, t, r) {
  var n = [],
    e = getRegisteredStyles(e, n, r);
  return n.length < 2 ? r : e + t(n);
}
var isBrowser,
  isTestEnv,
  globalContext,
  globalKey,
  Insertion = function (e) {
    var t,
      n = e.cache,
      i = e.serializedArr,
      e = useInsertionEffectAlwaysWithSyncFallback(function () {
        for (var e = '', t = 0; t < i.length; t++) {
          var r = insertStyles(n, i[t], !1);
          isBrowser$2 || void 0 === r || (e += r);
        }
        if (!isBrowser$2) return e;
      });
    return isBrowser$2 || 0 === e.length
      ? null
      : React$1.createElement(
          'style',
          (((t = {})['data-emotion'] =
            n.key +
            ' ' +
            i
              .map(function (e) {
                return e.name;
              })
              .join(' ')),
          (t.dangerouslySetInnerHTML = { __html: e }),
          (t.nonce = n.sheet.nonce),
          t)
        );
  },
  ClassNames = withEmotionCache(function (e, i) {
    function n() {
      if (o && 'production' !== process.env.NODE_ENV)
        throw new Error('css can only be used during render');
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      var n = serializeStyles(t, i.registered);
      return a.push(n), registerStyles(i, n, !1), i.key + '-' + n.name;
    }
    var o = !1,
      a = [],
      t = {
        css: n,
        cx: function () {
          if (o && 'production' !== process.env.NODE_ENV)
            throw new Error('cx can only be used during render');
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
            t[r] = arguments[r];
          return merge(i.registered, n, classnames(t));
        },
        theme: React$1.useContext(ThemeContext),
      },
      e = e.children(t),
      o = !0;
    return React$1.createElement(
      React$1.Fragment,
      null,
      React$1.createElement(Insertion, { cache: i, serializedArr: a }),
      e
    );
  });
'production' !== process.env.NODE_ENV &&
  (ClassNames.displayName = 'EmotionClassNames'),
  'production' !== process.env.NODE_ENV &&
    ((isBrowser = 'undefined' != typeof document),
    (isTestEnv = 'undefined' != typeof jest || 'undefined' != typeof vi),
    isBrowser) &&
    !isTestEnv &&
    ((globalContext =
      'undefined' != typeof globalThis
        ? globalThis
        : isBrowser
        ? window
        : global)[
      (globalKey = '__EMOTION_REACT_' + pkg.version.split('.')[0] + '__')
    ] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.'
      ),
    (globalContext[globalKey] = !0));
const FontStyle = ({ font: n }) => {
  var e = useMemo(() => {
    const r = [];
    return (
      n.fonts.forEach((e) => {
        var t;
        r.push(`
                @font-face {
                  font-family: '${n.name}';
                  font-weight: ${
                    (null == (t = e.style)
                      ? void 0
                      : t.replace('_Italic', '')) || 'normal'
                  };
                  ${
                    null != (t = e.style) && t.includes('_Italic')
                      ? 'font-style: italic;\n'
                      : ''
                  }
                  src: url(${e.urls.join(',')}) format('woff2');
                  font-display: block;
                }
            `);
      }),
      r.join('\n')
    );
  }, [n]);
  return jsx(Global, {
    styles: css`
      ${e}
    `,
  });
};
var FontStyle$1 = React__default$1.memo(FontStyle);
const GlobalStyle = ({ fonts: e, mode: t = 'view' }) => {
    return jsxs(Fragment, {
      children: [
        jsx(Global, {
          styles: css`
            ${`
        .lidojs-text {
            counter-reset: list;
            p {
                margin-left: calc(var(--indent-level)*1.7em);

            }
            p:before {
                counter-increment: list;
                content: counter(list, var(--counter-list-marker)) ".";
                left: 0;
                padding-right: 0.1em;
                height: calc(var(--line-height))*1em;
                width: calc(var(--indent-level)*1em);
                position: absolute;
                margin: 0;
                padding: 0;
                white-space: nowrap;
            }
        }
    `}
            ${`
        * {
            -webkit-user-select: ${
              'editor' === t ? 'none' : 'text'
            }; /* Safari */
            -khtml-user-select: ${
              'editor' === t ? 'none' : 'text'
            }; /* Konqueror HTML */
            -moz-user-select: ${
              'editor' === t ? 'none' : 'text'
            }; /* Old versions of Firefox */
            -ms-user-select: ${
              'editor' === t ? 'none' : 'text'
            }; /* Internet Explorer/Edge */
            user-select: ${'editor' === t ? 'none' : 'text'};
            -webkit-user-drag: none;
             -webkit-touch-callout: none; /* iOS Safari */
        }
    `}
          `,
        }),
        e.map((e) => jsx(FontStyle$1, { font: e }, e.name)),
      ],
    });
  },
  getGradientBackground = (e, t) => {
    const r = 100 / (e.length - 1);
    var n = e.map((e, t) => `${e} ${t * r}%`);
    switch (t) {
      case 'leftToRight':
        return `linear-gradient(90deg, ${n.join(', ')})`;
      case 'topToBottom':
        return `linear-gradient(${n.join(', ')})`;
      case 'topLeftToBottomRight':
        return `linear-gradient(135deg, ${n.join(', ')})`;
      case 'circleCenter':
        return `radial-gradient(circle at 50% 50%, ${n.join(', ')})`;
      default:
        return `radial-gradient(circle at 0% 0%, ${n.join(', ')})`;
    }
  },
  FrameContent = ({ clipPath: e, image: t, color: r, gradientBackground: n }) =>
    jsx('div', {
      css: {
        width: '100%',
        height: '100%',
        clipPath: e,
        background: n
          ? getGradientBackground(n.colors, n.style)
          : null != r
          ? r
          : void 0,
      },
      children:
        t &&
        jsx('div', {
          css: {
            width: t.boxSize.width,
            height: t.boxSize.height,
            transform: getTransformStyle({
              position: t.position,
              rotate: t.rotate,
            }),
            position: 'relative',
            userSelect: 'none',
          },
          children: jsx('img', {
            src: t.url,
            css: {
              objectFit: 'fill',
              width: '100%',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
            },
          }),
        }),
    }),
  TextContent = ({ text: e, colors: t, fontSizes: r, effect: n }) =>
    jsx('div', {
      className: 'lidojs-text',
      css: Object.assign(
        {
          p: {
            '&:before': Object.assign(
              {},
              getTextEffectStyle(
                (null == n ? void 0 : n.name) || 'none',
                null == n ? void 0 : n.settings,
                t[0],
                r[0]
              )
            ),
          },
        },
        getTextEffectStyle(
          (null == n ? void 0 : n.name) || 'none',
          null == n ? void 0 : n.settings,
          t[0],
          r[0]
        )
      ),
      dangerouslySetInnerHTML: { __html: e },
    }),
  ImageContent = ({ image: e, boxSize: t }) =>
    jsx('div', {
      css: {
        overflow: 'hidden',
        pointerEvents: 'auto',
        width: t.width,
        height: t.height,
      },
      children: jsx('div', {
        css: {
          width: e.boxSize.width,
          height: e.boxSize.height,
          transform: getTransformStyle({
            position: e.position,
            rotate: e.rotate,
          }),
          position: 'relative',
          userSelect: 'none',
          opacity: e.transparency,
        },
        children: jsx('img', {
          src: e.url,
          css: {
            objectFit: 'fill',
            width: '100%',
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
          },
        }),
      }),
    }),
  ShapeContent = ({
    boxSize: e,
    shape: t,
    color: r,
    gradientBackground: n,
    roundedCorners: i = 0,
    scale: o = 1,
    border: a,
  }) => {
    return jsxs('div', {
      css: { position: 'relative', width: e.width / o, height: e.height / o },
      children: [
        jsx('div', {
          css: {
            clipPath: `path("${getShapePath(t, {
              width: e.width / o,
              height: e.height / o,
              roundedCorners: i,
            })}")`,
            width: '100%',
            height: '100%',
            background: n
              ? getGradientBackground(n.colors, n.style)
              : r || '#fff',
          },
        }),
        a &&
          jsxs('svg', {
            viewBox: `0 0 ${e.width / o} ` + e.height / o,
            css: { position: 'absolute', inset: 0 },
            children: [
              i &&
                jsx('defs', {
                  children: jsx('clipPath', {
                    id: 'roundedCorners',
                    children: jsx('path', {
                      d: getShapePath(t, {
                        width: e.width / o,
                        height: e.height / o,
                        roundedCorners: i,
                      }),
                    }),
                  }),
                }),
              jsx('path', {
                d: getShapePath(t, {
                  width: e.width / o,
                  height: e.height / o,
                  roundedCorners: i,
                }),
                strokeLinecap: 'butt',
                fill: 'none',
                stroke: a.color,
                strokeWidth: a.weight,
                strokeDasharray: (() => {
                  switch (null == a ? void 0 : a.style) {
                    case 'longDashes':
                      return 6 * a.weight + ', ' + a.weight;
                    case 'shortDashes':
                      return 3 * a.weight + ', ' + a.weight;
                    case 'dots':
                      return a.weight + ', ' + a.weight;
                    default:
                      return;
                  }
                })(),
                clipPath: `path("${getShapePath(t, {
                  width: e.width / o,
                  height: e.height / o,
                  roundedCorners: i,
                })}")`,
              }),
            ],
          }),
      ],
    });
  };
var __assign = function () {
  return (__assign =
    Object.assign ||
    function (e) {
      for (var t, r = 1, n = arguments.length; r < n; r++)
        for (var i in (t = arguments[r]))
          Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      return e;
    }).apply(this, arguments);
};
function __rest(e, t) {
  var r = {};
  for (i in e)
    Object.prototype.hasOwnProperty.call(e, i) &&
      t.indexOf(i) < 0 &&
      (r[i] = e[i]);
  if (null != e && 'function' == typeof Object.getOwnPropertySymbols)
    for (var n = 0, i = Object.getOwnPropertySymbols(e); n < i.length; n++)
      t.indexOf(i[n]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, i[n]) &&
        (r[i[n]] = e[i[n]]);
  return r;
}
const RootContent = (e) => {
  var {
      boxSize: t,
      color: r,
      gradientBackground: n,
      image: i,
      position: o,
      rotate: a,
    } = e,
    e = __rest(e, [
      'boxSize',
      'color',
      'gradientBackground',
      'image',
      'position',
      'rotate',
    ]);
  return jsxs(
    'div',
    Object.assign(
      {
        css: {
          position: 'absolute',
          overflow: 'hidden',
          pointerEvents: 'auto',
          width: t.width,
          height: t.height,
        },
      },
      e,
      {
        children: [
          jsx('div', {
            css: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: t.width,
              height: t.height,
              background: n
                ? getGradientBackground(n.colors, n.style)
                : r || '#fff',
            },
          }),
          i &&
            jsx('div', {
              css: { width: t.width, height: t.height },
              children: jsx(ImageContent, {
                image: i,
                boxSize: t,
                rotate: a,
                position: o,
              }),
            }),
        ],
      }
    )
  );
};
function useMountedState() {
  var e = useRef(!1),
    t = useCallback(function () {
      return e.current;
    }, []);
  return (
    useEffect(function () {
      return (
        (e.current = !0),
        function () {
          e.current = !1;
        }
      );
    }, []),
    t
  );
}
function useAsyncFn(n, e, t) {
  void 0 === e && (e = []), void 0 === t && (t = { loading: !1 });
  var i = useRef(0),
    o = useMountedState(),
    t = useState(t),
    a = t[0],
    s = t[1],
    t = useCallback(function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      var r = ++i.current;
      return (
        a.loading ||
          s(function (e) {
            return __assign(__assign({}, e), { loading: !0 });
          }),
        n.apply(void 0, e).then(
          function (e) {
            return o() && r === i.current && s({ value: e, loading: !1 }), e;
          },
          function (e) {
            return o() && r === i.current && s({ error: e, loading: !1 }), e;
          }
        )
      );
    }, e);
  return [a, t];
}
function useAsync(e, t) {
  var e = useAsyncFn(e, (t = void 0 === t ? [] : t), { loading: !0 }),
    t = e[0],
    r = e[1];
  return (
    useEffect(
      function () {
        r();
      },
      [r]
    ),
    t
  );
}
const SvgContent = ({ image: l, boxSize: e, colors: f }) => {
    const [t, p] = useState();
    return (
      useAsync(async () => {
        var e = await fetchSvgContent(l),
          t =
            ((e.style.fill = ''),
            (e.style.stroke = ''),
            e.getElementsByTagName('g'));
        if (0 < t.length)
          for (let e = 0; e < t.length; e++) {
            var r = t[e].getAttribute('id');
            if (r) {
              r = r.match(/^[a-z]+(\d+)(_)*(\d*)$/i);
              if (r && 2 <= r.length) {
                var n = parseInt(r[1], 10) - 1,
                  i = t[e].querySelectorAll(
                    'path, circle, ellipse,line, rect, polygon,polyline, text'
                  );
                for (let e = 0; e < i.length; e++) {
                  var o = i[e].getAttribute('stroke') || 'none';
                  (i[e].style.fill = ''),
                    (i[e].style.stroke = ''),
                    'none' !== o
                      ? i[e].setAttribute('stroke', f[n] || '#000000')
                      : i[e].setAttribute('fill', f[n] || '#000000');
                }
              }
            }
          }
        else {
          var a = [],
            s = e.querySelectorAll(
              'path, circle, ellipse,line, rect, polygon,polyline, text'
            );
          for (let r = 0; r < s.length; r++) {
            var u = s[r].getAttribute('style');
            let e = s[r].getAttribute('stroke') || 'none',
              t = s[r].getAttribute('fill') || '#000000';
            const c = {};
            u &&
              u.split(';').forEach((e) => {
                var [e, t] = e.split(':');
                c[e.trim()] = t.trim();
              }),
              c.stroke && (e = c.stroke),
              c.fill && (t = c.fill),
              e && 'none' !== e
                ? (a.includes(new Color(e).toRgbString()) ||
                    a.push(new Color(e).toRgbString()),
                  (s[r].style.fill = ''),
                  (s[r].style.stroke = ''),
                  s[r].setAttribute(
                    'stroke',
                    f[a.indexOf(new Color(e).toRgbString())] || '#000000'
                  ))
                : t &&
                  'none' !== t &&
                  (a.includes(new Color(t).toRgbString()) ||
                    a.push(new Color(t).toRgbString()),
                  (s[r].style.fill = ''),
                  (s[r].style.stroke = ''),
                  s[r].setAttribute(
                    'fill',
                    f[a.indexOf(new Color(t).toRgbString())] || '#000000'
                  ));
          }
        }
        (e = new Blob([e.outerHTML], { type: 'image/svg+xml;charset=utf-8' })),
          (e = URL.createObjectURL(e));
        p(e);
      }, [l, f]),
      jsx('div', {
        css: { width: '100%', height: '100%' },
        children:
          l &&
          jsx('div', {
            css: {
              width: e.width,
              height: e.height,
              position: 'relative',
              userSelect: 'none',
            },
            children: jsx('img', {
              src: t,
              crossOrigin: 'anonymous',
              css: {
                objectFit: 'fill',
                width: '100%',
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
              },
            }),
          }),
      })
    );
  },
  RootLayer = ({
    boxSize: e,
    children: t,
    color: r,
    gradientBackground: n,
    image: i,
    position: o,
    rotate: a,
    scale: s,
  }) =>
    jsxs(Fragment, {
      children: [
        jsx(RootContent, {
          boxSize: e,
          position: o,
          rotate: a,
          gradientBackground: n,
          color: r,
          image: i,
          scale: s,
        }),
        t,
      ],
    }),
  TextLayer = ({
    text: e,
    boxSize: t,
    scale: r,
    fonts: n,
    colors: i,
    fontSizes: o,
    effect: a,
    rotate: s,
    position: u,
  }) =>
    jsx('div', {
      css: { transformOrigin: '0 0' },
      style: {
        width: t.width / r,
        height: t.height / r,
        transform: `scale(${r})`,
      },
      children: jsx(TextContent, {
        text: e,
        scale: r,
        fonts: n,
        colors: i,
        fontSizes: o,
        effect: a,
        boxSize: t,
        rotate: s,
        position: u,
      }),
    }),
  ImageLayer = ({ image: e, boxSize: t, position: r, rotate: n }) =>
    jsx(ImageContent, { image: e, boxSize: t, rotate: n, position: r }),
  ShapeLayer =
    ((ImageLayer.info = { name: 'Image', type: 'Image' }),
    ({
      boxSize: e,
      shape: t,
      color: r,
      gradientBackground: n,
      roundedCorners: i = 0,
      scale: o = 1,
      rotate: a,
      position: s,
      border: u,
    }) =>
      jsx('div', {
        css: { transformOrigin: '0 0' },
        style: {
          width: e.width / (o || 1),
          height: e.height / (o || 1),
          transform: `scale(${o || 1})`,
        },
        children: jsx(ShapeContent, {
          shape: t,
          color: r,
          roundedCorners: i,
          gradientBackground: n,
          boxSize: e,
          rotate: a,
          scale: o,
          position: s,
          border: u,
        }),
      })),
  FrameLayer =
    ((ShapeLayer.info = { name: 'Shape', type: 'Shape' }),
    ({
      clipPath: e,
      image: t,
      color: r,
      gradientBackground: n,
      boxSize: i,
      position: o,
      rotate: a,
      scale: s,
    }) =>
      jsx('div', {
        css: { transformOrigin: '0 0' },
        style: {
          width: i.width / s,
          height: i.height / s,
          transform: `scale(${s})`,
        },
        children: jsx(FrameContent, {
          clipPath: e,
          scale: s,
          color: r,
          gradientBackground: n,
          image: t,
          boxSize: i,
          rotate: a,
          position: o,
        }),
      })),
  SvgLayer = (e) => {
    var t = e['boxSize'],
      e = __rest(e, ['boxSize']);
    return jsx('div', {
      css: { transformOrigin: '0 0' },
      style: { width: t.width, height: t.height },
      children: jsx(SvgContent, Object.assign({ boxSize: t }, e)),
    });
  },
  GroupLayer = ({ boxSize: e, scale: t, children: r }) =>
    jsx('div', {
      css: { transformOrigin: '0 0' },
      style: {
        width: e.width / t,
        height: e.height / t,
        transform: `scale(${t})`,
      },
      children: r,
    }),
  resolvers = {
    RootLayer: RootLayer,
    TextLayer: TextLayer,
    ImageLayer: ImageLayer,
    ShapeLayer: ShapeLayer,
    FrameLayer: FrameLayer,
    SvgLayer: SvgLayer,
    GroupLayer: GroupLayer,
  },
  TransformLayer = (
    { boxSize: e, rotate: t, position: r, transparency: n, children: i },
    o
  ) =>
    jsx('div', {
      ref: o,
      css: {
        touchAction: 'pan-x pan-y pinch-zoom',
        pointerEvents: 'auto',
        position: 'absolute',
      },
      style: {
        width: e.width,
        height: e.height,
        transform: getTransformStyle({ position: r, rotate: t }),
        opacity: n,
      },
      children: i,
    });
var TransformLayer$1 = forwardRef(TransformLayer);
const renderLayer = (t, e) => {
    var r = t[e].child.map((e) => renderWrapperLayer(t, e));
    return createElement(
      resolvers[t[e].type.resolvedName],
      Object.assign(Object.assign({}, t[e].props), { key: e }),
      r
    );
  },
  renderWrapperLayer = (e, t) =>
    createElement(
      TransformLayer$1,
      Object.assign(Object.assign({}, e[t].props), { key: t }),
      renderLayer(e, t)
    ),
  renderPages = (e) => e.map((e) => renderWrapperLayer(e.layers, 'ROOT')),
  PageRender = ({ boxSize: e, scale: t, children: r }, n) =>
    jsx('div', {
      ref: n,
      css: {
        position: 'absolute',
        width: e.width,
        height: e.height,
        transformOrigin: '0px 0px',
        overflow: 'hidden',
      },
      style: {
        width: e.width,
        height: e.height,
        transform: getTransformStyle({ scale: t }),
      },
      children: r,
    });
var PageRender$1 = forwardRef(PageRender);
let timeout;
const Frame = ({ width: a, height: s, data: r }) => {
  const u = useRef([]),
    [n, e] = useState(0),
    [i, c] = useState({ width: a, height: s, scale: 1 });
  var t = getUsedFonts(r);
  const o = useCallback(
      (t) => {
        e((e) => {
          e = (e + t) % r.length;
          return 0 <= e ? e : r.length + e;
        });
      },
      [e, r.length]
    ),
    l = useCallback(
      () => (
        (timeout = setTimeout(() => {
          o(1);
        }, 5e3)),
        () => {
          clearTimeout(timeout);
        }
      ),
      [o, n]
    );
  useEffect(() => {
    const e = lodashExports.throttle(() => {
      timeout && clearTimeout(timeout);
      var { innerWidth: e, innerHeight: t } = window,
        r = e / t,
        n = a / s,
        i = n < r ? t * n : e,
        r = n < r ? t : e / n;
      const o = i / a;
      c({ width: i, height: r, scale: o }),
        u.current &&
          u.current.forEach((e) => {
            e.style.cssText = `transform: scale(${o})`;
          }),
        l();
    }, 16);
    return (
      e(),
      window.addEventListener('resize', e),
      () => {
        window.removeEventListener('resize', e);
      }
    );
  }, [a, s, l]);
  var f = useMemo(() => renderPages(r), [a, s]);
  return jsxs('div', {
    css: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    children: [
      jsx(GlobalStyle, { fonts: t }),
      f.map((e, t) =>
        jsx(
          'div',
          {
            css: {
              width: i.width,
              height: i.height,
              position: 'absolute',
              opacity: t === n ? 1 : 0,
              zIndex: t === n ? 1 : 0,
              transition: 'opacity .5s ease-in-out',
            },
            children: jsx(PageRender$1, {
              ref: (e) => (e ? (u.current[t] = e) : null),
              boxSize: { width: a, height: s },
              scale: i.scale,
              children: e,
            }),
          },
          t
        )
      ),
    ],
  });
};
export { Frame };
