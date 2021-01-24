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

    expect(objectGrep(data, 'ID').short()).toEqual({
      inKeys: ['glossary.GlossDiv.GlossList.GlossEntry.ID', 'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.ID'],
      inValues: ['glossary.GlossDiv.GlossList.GlossEntry.GlossDef.pard'],
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

    expect(objectGrep(data, null).short()).toEqual({
      inKeys: ['glossary.GlossDiv.GlossList.GlossEntry.GlossDef.null'],
      inValues: ['glossary.GlossDiv.EmptyField'],
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

    expect(objectGrep(data, 8).short()).toEqual({
      inKeys: ['glossary.GlossDiv.key8'],
      inValues: ['glossary.GlossDiv.GlossList.GlossEntry.Abbrev', 'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.ID'],
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

    expect(objectGrep(data, 'ard').short()).toEqual({
      inKeys: ['glossary.GlossDiv.GlossList.GlossEntry.GlossDef.pard'],
      inValues: ['glossary.GlossDiv.GlossList.GlossEntry.GlossTerm'],
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

    expect(objectGrep(data, undefined).short()).toEqual({
      inKeys: ['glossary.GlossDiv.GlossList.GlossEntry.undefinedkey'],
      inValues: ['glossary.GlossDiv.GlossList.GlossEntry.ID'],
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

    expect(objectGrep(data, true).short()).toEqual({
      inKeys: ['glossary.GlossDiv.GlossList.GlossEntry.true'],
      inValues: ['glossary.isAwesome'],
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

    expect(objectGrep(data, false).short()).toEqual({
      inKeys: ['glossary.GlossDiv.false'],
      inValues: ['glossary.GlossDiv.GlossList.GlossEntry.true'],
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

    expect(objectGrep(data, 'arr').short()).toEqual({
      inKeys: [],
      inValues: [
        'glossary.GlossDiv.GlossList.GlossEntry.list.0',
        'glossary.GlossDiv.GlossList.GlossEntry.list.3',
        'glossary.GlossDiv.GlossList.GlossEntry.list.4.foo.1',
      ],
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

    expect(objectGrep(data, 't', 3).short()).toEqual({
      inKeys: [
        'glossary.title',
        'glossary.GlossDiv.title',
        'glossary.GlossDiv.EmptyField',
        'glossary.GlossDiv.GlossList'
      ],
      inValues: [
        'glossary.isAwesome',
      ],
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

    expect(objectGrep(data, /^A.*DocBook$/).short()).toEqual({
      inKeys: [
        'glossary.GlossDiv.A_regexpkey_DocBook',
      ],
      inValues: [
        'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.pard'
      ],
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

    expect(objectGrep(obj, 'baz').short()).toEqual({
      inKeys: ['foo.bar.baz', 'foo.bar.baz.foo.bar.baz'],
      inValues: ['oof.rab.zab.2'],
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

    expect(objectGrep(obj, /b.z/).short()).toEqual({
      inKeys: ['foo.bar.baz', 'foo.bar.baz.foo.bar.baz'],
      inValues: ['oof.rab.zab.2'],
    });

    expect(objectGrep(obj, 'baz', 4)).toEqual({
      inKeys: {
        'foo.bar.baz': obj.foo.bar.baz
      },
      inValues: {
        'oof.rab.zab.2': obj.oof.rab.zab[2]
      },
    });

    expect(objectGrep(obj, 'baz', 4).short()).toEqual({
      inKeys: ['foo.bar.baz'],
      inValues: ['oof.rab.zab.2'],
    });
  });
});

describe('inject and revoke', () => {
  beforeEach(() => {
    objectGrep.revoke();
  });
  test('inject and revoke', () => {
    expect(Object.grep).toBeUndefined();
    objectGrep.inject();
    expect(Object.grep).toBeDefined();
    objectGrep.revoke();
    expect(Object.grep).toBeUndefined();
  });

  test('inject grep as deepSearch', () => {
    expect(Object.grep).toBeUndefined();
    expect(Object.deepSearch).toBeUndefined();
    objectGrep.inject('deepSearch');
    expect(Object.deepSearch).toBeDefined();
    expect(Object.grep).toBeUndefined();
    objectGrep.revoke();
    expect(Object.deepSearch).toBeUndefined();
    expect(Object.grep).toBeUndefined();
  });

  test('inject for an existing method', () => {
    expect(Object.grep).toBeUndefined();
    objectGrep.inject();
    expect(Object.grep).toBeDefined();
    expect(() => {
      objectGrep.inject();
    }).toThrowError(new Error(`Object.prototype already has grep. Choose another name`));
  });
});
