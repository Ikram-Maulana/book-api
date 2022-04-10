import { User } from 'src/users/entity/user.entity';
import { RefreshToken } from './../entity/refresh-token.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const refreshToken = this.create();
    refreshToken.user = user;
    refreshToken.isRevoked = false;
    const expiredAt = new Date();
    expiredAt.setTime(expiredAt.getTime() + ttl);
    refreshToken.expiredAt = expiredAt;

    return await refreshToken.save();
  }
}
