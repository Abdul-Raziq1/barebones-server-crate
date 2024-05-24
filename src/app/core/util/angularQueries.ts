import { inject } from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { lastValueFrom } from "rxjs";
import { UserService } from "../services/user/user.service";
import { ProductService } from "../services/product/product.service";

const queryKeys = {
    userDetails: ['user', 'detail'],
    featuredProducts: ['featured products']
}

export function injectUserQuery() {
    const userService = inject(UserService)
    const userQuery = injectQuery(() => ({
        queryKey: queryKeys.userDetails,
        queryFn: () => lastValueFrom(userService.getUserData()),
        retry: 3,
        staleTime: Infinity,     
    }))
    return userQuery
}

export function injectFeaturedProductsQuery() {
    const productService = inject(ProductService)
    return injectQuery(() => ({
        queryKey: queryKeys.featuredProducts,
        queryFn: () => lastValueFrom(productService.getFeaturedProducts()),
        staleTime: 1000 * 60 * 15,
        gcTime: 1000 * 60 * 15,
    }))
}