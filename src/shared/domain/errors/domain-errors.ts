import { DomainError } from './domain.error.js';

export class EntityNotFoundError extends DomainError {
  constructor(entityName: string) {
    super(`${entityName} not found`);
  }
}

export class BusinessRuleError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

export class ConflictError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}