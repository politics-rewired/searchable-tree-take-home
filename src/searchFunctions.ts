import {Column, Form, NamedEntity, Schema, Table, View} from "./data";

function matches(toMatch: string[], tokens: string[]): boolean {
    if (tokens.length === 0) return true

    for (const token of tokens) {
        for (const m of toMatch) {
            if (m.indexOf(token) >= 0) return true
        }
    }
    return false
}

function tokenize(s: string): string[] {
    return s.split(' ').map(x => x.toLowerCase())
}

 function namedEntityMatches(namedEntity: NamedEntity, tokens: string[]): boolean {
    return matches(tokenize(namedEntity.systemName), tokens) || matches(tokenize(namedEntity.displayName), tokens)
}

function publicMatches( entity: { public: boolean }, publicOnly: boolean): boolean {
    return publicOnly ? entity.public : true // ignore public if not public only
}

 function filterTable(table: Table, tokens: string[], publicOnly: boolean): Table | undefined {
     if (namedEntityMatches(table, tokens) && publicMatches(table, publicOnly)) return table

     const columns: Column[] = table.columns.filter(x => namedEntityMatches(x, tokens))
     const forms: Form[] = table.forms.filter(x => namedEntityMatches(x, tokens) && publicMatches(x, publicOnly))
     const views: View[] = table.views.filter(x => namedEntityMatches(x, tokens) && publicMatches(x, publicOnly))
     const totalRetained = columns.length + forms.length + views.length

     if (totalRetained === 0) {
         // table has no matching children and does not match itself
         return undefined
     }

     if (publicOnly && !table.public) {}

     return {
         ...table,
         columns,
         forms,
         views
     }
}

function filterSchema(schema: Schema, tokens: string[], publicOnly: boolean): Schema | undefined {
    if (namedEntityMatches(schema, tokens) && publicMatches(schema, publicOnly) ) {
        return schema
    }

    const tables: Table[] = schema.tables.flatMap(table => {
        const filtered = filterTable(table, tokens, publicOnly)
        return filtered === undefined ? [] : [filtered]
    })

    if (tables.length === 0) return undefined


    return {
        ...schema,
        tables
    }
}

export interface FilterSchemasInput {
    schemas: Schema[],
    searchString: string | undefined,
    publicOnly: boolean | undefined
}
export function filterSchemas(input: FilterSchemasInput): Schema[] {
    const tokens = tokenize(input.searchString || '')
    return input.schemas.flatMap(schema => {
        const result = filterSchema(schema, tokens, input.publicOnly)
        return result === undefined ? [] : [result]
    })
}