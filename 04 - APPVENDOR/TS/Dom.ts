/* Pour vérifier la concordance d'un élément du DOM (si il existe)
 */
export function Dom(element: string): JQuery {

    // On récupère l'élément HTML
    let elementJquery: JQuery = $(element);

    // On vérifie qu'il existe bien dans le document
    if (elementJquery.length < 1)
        throw new Error(`L'élément ${element} n'existe pas dans votre html !`) // Renvoit une erreur au système

    // Si tout est ok, on return notre élément
    return elementJquery;
}