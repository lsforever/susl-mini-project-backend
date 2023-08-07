import rootRoutes from './root';
import authRoutes from './auth';
import userRoutes from './user';
import cropRoutes from './crop';

// root routes
router.use('/', rootRoutes);

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// crop routes
router.use('/crop', addressRoutes);

export default router;
