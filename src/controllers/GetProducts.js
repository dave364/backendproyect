import { connectToDatabase, productModel } from "../model/Product.js";

// Conexión a la base de datos
connectToDatabase();

export const getProducts = async (req, res) => {
  const { page, orderBy } = req.params;
  try {
    const order = orderBy == 0 ? {} : { price: orderBy };
    const options = {
      page: page,
      limit: 4,
      sort: order
    };
    console.log(options)
    const products = await productModel.paginate({}, options);
    console.log(products);
    return     res.json({
      status: "success",
      payload: products,
    });
  }
    catch (error) {
    console.error("Error al leer los productos:", error);
    throw error;
  }
 




  /* const { limit = 5, page = 1, sort, query } = req.query;

  // Construir el objeto de filtro
  const filter = {};
  if (query) {
    filter.$or = [
      { category: query },
      { inCart: query === "available" },
    ];
  }

  // Construir el objeto de ordenamiento
  const sortOptions = {};
  if (sort === "asc") {
    sortOptions.price = 1;
  } else if (sort === "desc") {
    sortOptions.price = -1;
  }

  try {
    const totalCount = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Calcular el índice de inicio y fin para la paginación
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Consultar los productos con los filtros y opciones de paginación y ordenamiento
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit);

    // Construir los enlaces a las páginas previas y siguientes
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevLink = hasPrevPage ? `/products?page=${prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null;
    const nextLink = hasNextPage ? `/products?page=${nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null;

    res.json({
      status: "success",
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
  }*/
};
