import { data } from './data';
import { objectGrep } from '../src';

describe('cases', () => {
  test('base case', () => {
    expect(objectGrep(data, 'ID')).toEqual({
      keys: ['glossary.GlossDiv.GlossList.GlossEntry.ID', 'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.ID'],
      values: ['glossary.GlossDiv.GlossList.GlossEntry.GlossDef.pard'],
    });
  });

  test('null case', () => {
    expect(objectGrep(data, null)).toEqual({
      keys: ['glossary.GlossDiv.GlossList.GlossEntry.GlossDef.null'],
      values: ['glossary.GlossDiv.EmptyField'],
    });
  });

  test('number case', () => {
    expect(objectGrep(data, 8)).toEqual({
      keys: ['glossary.GlossDiv.key8'],
      values: ['glossary.GlossDiv.GlossList.GlossEntry.Abbrev', 'glossary.GlossDiv.GlossList.GlossEntry.GlossDef.ID'],
    });
  });

  test('string case', () => {
    expect(objectGrep(data, 'ard')).toEqual({
      keys: ['glossary.GlossDiv.GlossList.GlossEntry.GlossDef.pard'],
      values: ['glossary.GlossDiv.GlossList.GlossEntry.GlossTerm'],
    });
  });

  test('undefined case', () => {
    expect(objectGrep(data, undefined)).toEqual({
      keys: ['glossary.GlossDiv.GlossList.GlossEntry.undefinedkey'],
      values: ['glossary.GlossDiv.GlossList.GlossEntry.ID'],
    });
  });

  test('true case', () => {
    expect(objectGrep(data, true)).toEqual({
      keys: ['glossary.GlossDiv.GlossList.GlossEntry.true'],
      values: ['glossary.isAwesome'],
    });
  });

  test('false case', () => {
    expect(objectGrep(data, false)).toEqual({
      keys: ['glossary.GlossDiv.false'],
      values: ['glossary.GlossDiv.GlossList.GlossEntry.true'],
    });
  });

  test('array case', () => {
    expect(objectGrep(data, 'arr')).toEqual({
      values: ['glossary.GlossDiv.GlossList.GlossEntry.list.0', 'glossary.GlossDiv.GlossList.GlossEntry.list.3', 'glossary.GlossDiv.GlossList.GlossEntry.list.4.foo.1'],
    });
  });

  test('depth case', () => {
    expect(objectGrep(data, 't', 3)).toEqual({
      keys: ['glossary.title', 'glossary.GlossDiv.title', 'glossary.GlossDiv.EmptyField', 'glossary.GlossDiv.GlossList'],
      values: ['glossary.isAwesome'],
    });
  });

  test('regexp case', () => {
    expect(objectGrep(data, /^A.*DocBook$/)).toEqual({
      keys: ['glossary.GlossDiv.A_regexpkey_DocBook'],
      values: ['glossary.GlossDiv.GlossList.GlossEntry.GlossDef.pard'],
    });
  });
});
