import { objectGrep } from '../src';
import { data } from './data';

describe('cases', () => {
  test('base case', () => {
    expect(objectGrep(data, 'ID')).toEqual({
      inKeys: {
        'glossary.GlossDiv.GlossList.GlossEntry.ID': undefined,
        'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.ID': '48'
      },
      inValues: {
        'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.pard': 'A meta-markup language, used to create markup ID languages such as DocBook'
      },
    });
  });

  test('null case', () => {
    expect(objectGrep(data, null)).toEqual({
      inKeys: {
        'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.null': 'EmptyField'
      },
      inValues: {
        'glossary.GlossDiv.EmptyField': null
      },
    });
  });

  test('number case', () => {
    expect(objectGrep(data, 8)).toEqual({
      inKeys: {
        'glossary.GlossDiv.key8': 'HTML'
      },
      inValues: {
        'glossary.GlossDiv.GlossList.GlossEntry.Abbrev': 'ISO 8879:1986',
        'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.ID': '48'
      },
    });
  });

  test('string case', () => {
    expect(objectGrep(data, 'ard')).toEqual({
      inKeys: {
        'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.pard': 'A meta-markup language, used to create markup ID languages such as DocBook'
      },
      inValues: {
        'glossary.GlossDiv.GlossList.GlossEntry.GlossTerm': 'Standard Generalized Markup Language'
      },
    });
  });

  test('undefined case', () => {
    expect(objectGrep(data, undefined)).toEqual({
      inKeys: {
        'glossary.GlossDiv.GlossList.GlossEntry.undefinedkey': 'badKey'
      },
      inValues: {
        'glossary.GlossDiv.GlossList.GlossEntry.ID': undefined
      },
    });
  });

  test('true case', () => {
    expect(objectGrep(data, true)).toEqual({
      inKeys: {
        'glossary.GlossDiv.GlossList.GlossEntry.true': false
      },
      inValues: {
        'glossary.isAwesome': true
      },
    });
  });

  test('false case', () => {
    expect(objectGrep(data, false)).toEqual({
      inKeys: {
        'glossary.GlossDiv.false': 'JS'
      },
      inValues: {
        'glossary.GlossDiv.GlossList.GlossEntry.true': false
      },
    });
  });

  test('array case', () => {
    expect(objectGrep(data, 'arr')).toEqual({
      inKeys: {},
      inValues: {
        'glossary.GlossDiv.GlossList.GlossEntry.list.0': 'arr',
        'glossary.GlossDiv.GlossList.GlossEntry.list.3': 'arr',
        'glossary.GlossDiv.GlossList.GlossEntry.list.4.foo.1': 'arr',
      },
    });
  });

  test('depth case', () => {
    expect(objectGrep(data, 't', 3)).toEqual({
      inKeys: {
        'glossary.title': 'example glossary',
        'glossary.GlossDiv.title': 'S',
        'glossary.GlossDiv.EmptyField': null,
        'glossary.GlossDiv.GlossList': data.glossary.GlossDiv.GlossList
      },
      inValues: {
        'glossary.isAwesome': true
      },
    });
  });

  test('regexp case', () => {
    expect(objectGrep(data, /^A.*DocBook$/)).toEqual({
      inKeys: {
        'glossary.GlossDiv.A_regexpkey_DocBook': 1,
      },
      inValues: {
        'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.pard': 'A meta-markup language, used to create markup ID languages such as DocBook'
      },
    });
  });

  test('readme case', () => {
    const obj = {
      foo: {
        bar: {
          baz: {
            foo: {
              bar: {
                baz: 'zab'
              }
            }
          }
        }
      },
      oof: {
        rab: {
          zab: ['foo', 'bar', 'baz', 'zab', 'rab', 'oof']
        }
      }
    };

    expect(objectGrep(obj, 'baz')).toEqual({
      inKeys: {
        'foo.bar.baz': obj.foo.bar.baz,
        'foo.bar.baz.foo.bar.baz': obj.foo.bar.baz.foo.bar.baz
      },
      inValues: {
        'oof.rab.zab.2': obj.oof.rab.zab[2]
      },
    });

    expect(objectGrep(obj, /b.z/,)).toEqual({
      inKeys: {
        'foo.bar.baz': obj.foo.bar.baz,
        'foo.bar.baz.foo.bar.baz': obj.foo.bar.baz.foo.bar.baz
      },
      inValues: {
        'oof.rab.zab.2': obj.oof.rab.zab[2]
      },
    });

    expect(objectGrep(obj, 'baz', 4)).toEqual({
      inKeys: {
        'foo.bar.baz': obj.foo.bar.baz
      },
      inValues: {
        'oof.rab.zab.2': obj.oof.rab.zab[2]
      },
    });
  });
});

describe('short', () => {
  test('base case', () => {
    expect(objectGrep(data, 'ID').short()).toEqual({
      inKeys: ['glossary.GlossDiv.GlossList.GlossEntry.ID', 'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.ID'],
      inValues: ['glossary.GlossDiv.GlossList.GlossEntry.GlossDef.pard'],
    });
  });
});

describe('inject', () => {
  test('inject', () => {
    expect(Object.grep).toBeUndefined();
    objectGrep.inject();
    expect(Object.grep).toBeDefined();
  });
});
