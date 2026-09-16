import { SPEC_GROUPS, rowHasDifference } from './compareData';
import type { CompareProduct } from './types';

interface CompareSpecTablesProps {
  products: CompareProduct[];
  onlyDifferences: boolean;
}

export function CompareSpecTables({ products, onlyDifferences }: CompareSpecTablesProps) {
  return <section className="compare-specs-wrap" aria-labelledby="specs-heading">
    <div className="compare-section-header">
      <h2 id="specs-heading">Ficha técnica comparada</h2>
    </div>

    {SPEC_GROUPS.map((group, groupIndex) => {
      const rows = onlyDifferences
        ? group.rows.filter((row) => rowHasDifference(row, products))
        : group.rows;
      if (rows.length === 0) return null;

      const headingId = `compare-group-${groupIndex}`;
      return <section key={group.category} className="compare-spec-group" aria-labelledby={headingId}>
        <div className="compare-group-title-bar">
          <h3 id={headingId}><span aria-hidden="true">{group.icon}</span>{group.category}</h3>
        </div>
        <div className="compare-table-wrap-outer" tabIndex={0} role="region" aria-label={`${group.category}; desplaza horizontalmente si es necesario`}>
          <table className="compare-table-detailed">
            <caption className="sr-only">Comparación de {group.category.toLocaleLowerCase('es')}</caption>
            <thead>
              <tr>
                <th scope="col">Característica</th>
                {products.map((product) => <th key={product.slug} scope="col">{product.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isDifferent = rowHasDifference(row, products);
                return <tr key={row.id} className={isDifferent ? 'is-different' : undefined}>
                  <th scope="row">
                    <span>{row.label}</span>
                    {isDifferent && <span className="compare-diff-tag">Difiere</span>}
                  </th>
                  {products.map((product) => <td key={product.slug}>{row.getValue(product)}</td>)}
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </section>;
    })}

    {onlyDifferences && SPEC_GROUPS.every((group) => group.rows.every((row) => !rowHasDifference(row, products)))
      && <p className="compare-empty-differences" role="status">No hay diferencias en los datos disponibles para esta selección.</p>}
  </section>;
}
