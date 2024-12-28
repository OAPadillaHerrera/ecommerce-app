

import { Test } from "@nestjs/testing";
import { AuthService } from "../Auth/Auth.service";
import { UsersRepository } from "../Users/users.repository";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../Users/Users.service";
import { Users } from "../Users/users.entity";
import * as bcrypt from 'bcrypt'; // Asegúrate de importar bcrypt para la comparación

describe("authService", () => {
    let authService: AuthService;

    const mockUser: Omit<Users, "id"> = {
        email: "user6@example.com",
        name: "Fito Paez",
        address: "888 Elm St",
        phone: 600654344,
        country: "Portugal",
        city: "Lisboa",
        password: "Password123!",
        isAdmin: "t",
        roles: [],
        orders: []
    };

    beforeEach(async () => {
        const mockUsersRepository: Partial<UsersRepository> = {
            logUser: () => Promise.resolve(undefined),
            createUser: (user: Omit<Users, "id">): Promise<Users> => Promise.resolve({
                ...user,
                id: "1234fs-234sd-24csf-34sdfg",
            })
        };

        const mockUsersService = {
            findUserByEmail: () => Promise.resolve(null), // Método simulado
            createUser: async (user: Omit<Users, "id">): Promise<Users> => {
                // Simula el hasheo de la contraseña
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return {
                    ...user,
                    password: hashedPassword,
                    id: "1234fs-234sd-24csf-34sdfg",
                };
            }
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                JwtService,
                {
                    provide: UsersRepository,
                    useValue: mockUsersRepository,
                },
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it("Create an instance of AuthService", async () => {
        expect(authService).toBeDefined();
    });

    it("signUp() a new user with an encrypted password", async () => {

        const user = await authService.signUp(mockUser);
        console.log (user.password);
        expect(user).toBeDefined();
        expect(user.password).not.toEqual(mockUser.password); 
        
    });
});





