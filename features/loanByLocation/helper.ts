export function formatActiveCategories(activeCategories: Set<string>) {
    let res = ''
    activeCategories.forEach((data) => {
      res += `${data}, `
    })
    res = res.slice(0, res.length - 2) + ' '
    return res
  }
