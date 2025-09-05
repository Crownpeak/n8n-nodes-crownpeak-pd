
import { CrownpeakPD } from '../nodes/CrownpeakPD/CrownpeakPD.node';
import { INodePropertyOptions } from 'n8n-workflow';

describe('CrownpeakPD Node', () => {
  const node = new CrownpeakPD();

  it('should be defined', () => {
    expect(node).toBeDefined();
  });

  it('should contain correct node metadata', () => {
    expect(node.description.name).toBe('crownpeakPd');
    expect(node.description.displayName).toBe('Fredhopper Product Discovery');
    expect(Array.isArray(node.description.properties)).toBe(true);
    expect(node.description.credentials?.[0].name).toBe('crownpeakPDApi');
  });

  it('should define all expected operations for each resource', () => {
    function getOperationValues(resource: string) {
      const opProp = node.description.properties.find(
        (prop: any) => prop.name === 'operation' && prop.displayOptions?.show?.resource?.includes(resource)
      );
      if (!opProp || !Array.isArray(opProp.options)) return [];
      return opProp.options
        .filter((o: any): o is INodePropertyOptions => typeof o === 'object' && o !== null && 'value' in o)
        .map((o) => o.value);
    }

    expect(getOperationValues('authentication')).toEqual(
      expect.arrayContaining(['getToken'])
    );

    expect(getOperationValues('items')).toEqual(
      expect.arrayContaining([
        'upsertItems',
        'patchItems',
        'deleteItems',
        'createItemSchema',
        'updateItemSchema',
        'getItemSchema',
        'deleteItemSchema',
      ])
    );

    expect(getOperationValues('catalog')).toEqual(
      expect.arrayContaining([
        'createCatalog',
        'createDefaultCatalogBatch',
        'listCatalogs',
        'getActiveCatalog',
        'activateCatalog',
        'deleteCatalog',
      ])
    );

    expect(getOperationValues('categoryTree')).toEqual(
      expect.arrayContaining([
        'createCategoryTree',
        'updateCategoryTree',
        'listCategoryTrees',
        'getCategoryTree',
        'deleteCategoryTree',
      ])
    );

    expect(getOperationValues('locale')).toEqual(
      expect.arrayContaining([
        'setDefaultLocale',
        'getDefaultLocale',
        'deleteDefaultLocale',
      ])
    );
  });
});
