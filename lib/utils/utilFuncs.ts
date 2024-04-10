import { BookQueryObject, BookQueryProps } from "@/store/server/books/types"

import qs from "qs"

export const defaultStroke = (className: string): string =>
  new RegExp("stroke-*", "g").test(className) ? "" : "stroke-2 stroke-skin-dark"

export const generateUniqueArray = (num: number) => {
  let numbers = new Set<number>()
  while (numbers.size < num) {
    let randomNum = Math.floor(Math.random() * (num - 1 + 1)) + 1
    numbers.add(randomNum)
  }

  return Array.from(numbers)
}

export const generateBookQuery = ({
  slug,
  limit = 10,
  pageNum = 1,
  ids = [],
  searchTerm = "",
}: BookQueryProps) => {
  const queryObject: BookQueryObject = {}

  if (slug) {
    queryObject.filters = {
      categories: {
        slug: {
          $eq: slug,
        },
      },
    }
  }

  if (limit) {
    queryObject.pagination = {
      limit: limit,
    }
  }

  if (pageNum) {
    queryObject.pagination = {
      page: pageNum,
      pageSize: limit,
    }
  }

  if (ids.length > 0) {
    queryObject.filters = {
      id: {
        $in: ids,
      },
      ...queryObject.filters,
    }
  }

  if (searchTerm) {
    queryObject.filters = {
      title: {
        $containsi: searchTerm,
      },
      ...queryObject.filters,
    }
  }

  return qs.stringify(queryObject, {
    encodeValuesOnly: true, // prettify URL
  })
}
